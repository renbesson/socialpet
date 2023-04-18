////////////////////////////////////////////////////////////////////////////////
//  Requires
////////////////////////////////////////////////////////////////////////////////
const { bucket } = require("../../config/firebase");
const Pet = require("../../models/Pet");
const { checkToken } = require("../../utils/checkToken");
const router = require("express").Router();

////////////////////////////////////////////////////////////////////////////////
//  Get one pet
////////////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  const petId = req.query.petId;

  try {
    const pet = await Pet.findById(petId);
    const { password, updatedAt, ...other } = pet._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Get a follow
////////////////////////////////////////////////////////////////////////////////
router.get("/follow", async (req, res) => {
  const petId = req.query.petId;

  try {
    const followingPet = await Pet.findById(petId).populate("posts");
    const { password, updatedAt, ...other } = followingPet._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Follow a pet
////////////////////////////////////////////////////////////////////////////////
router.put("/:id/follow", async (req, res) => {
  const petId = req.query.petId;

  if (req.body.petId !== req.params.id) {
    try {
      const pet = await Pet.findById(req.params.id);
      const currentPet = await Pet.findById(req.body.petId);
      if (!pet.followers.includes(req.body.petId)) {
        await pet.updateOne({ $push: { followers: req.body.petId } });
        await currentPet.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("pet has been followed");
      } else {
        res.status(403).json("you allready follow this pet");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

////////////////////////////////////////////////////////////////////////////////
// Unfollow a pet
////////////////////////////////////////////////////////////////////////////////
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.petId !== req.params.id) {
    try {
      const pet = await Pet.findById(req.params.id);
      const currentPet = await Pet.findById(req.body.petId);
      if (pet.followers.includes(req.body.petId)) {
        await pet.updateOne({ $pull: { followers: req.body.petId } });
        await currentPet.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("pet has been unfollowed");
      } else {
        res.status(403).json("you dont follow this pet");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;

////////////////////////////////////////////////////////////////////////////////
// Upload an avatar
////////////////////////////////////////////////////////////////////////////////
router.post("/avatar", checkToken, async (req, res) => {
  try {
    // Raw base64 File
    const fileBase64 = req.body.fileAsString;

    // Just the bytes without the metadata (needed to upload to firebase storage)
    const fileBytes = fileBase64.split(",")[1];

    // Creates a buffer with the fileBytes
    const fileBuffer = Buffer.from(fileBytes, "base64");

    // Gets only the file extension
    const fileExtension = fileBase64.split(";")[0].split("/")[1];

    // Sets the path for the file on the remote server
    const remotePath = `avatars/${req.user._id}_avatar.${fileExtension}`;

    const file = bucket.file(remotePath);

    file
      .createWriteStream()
      .on("error", (err) => {
        console.error("Error uploading file:", err);
      })
      .on("finish", () => {
        console.log(`File ${remotePath} uploaded successfully.`);
      })
      .end(fileBuffer);

    const url = await file.getSignedUrl({
      version: "v2",
      action: "read",
      expires: Date.now() + 60 * 60 * 100000000,
    });

    const pet = await Pet.findByIdAndUpdate(
      req.user._id,
      { avatar: url[0] },
      { new: true }
    );

    res.status(201).json({ url: url[0], message: "Avatar Updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
