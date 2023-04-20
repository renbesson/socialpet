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
router.post("/", checkToken, async (req, res) => {
  const petId = req.query.petId;

  try {
    const pet = await Pet.findById(petId);
    const { password, updatedAt, ...other } = pet._doc;
    res.status(200).json({ pet: other });
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
//  Follow/Unfollow a pet
////////////////////////////////////////////////////////////////////////////////
router.put("/follow", checkToken, async (req, res) => {
  const petId = req.query.petId;

  if (petId !== req.user._id) {
    try {
      const user = await Pet.findById(req.user._id);
      const pet = await Pet.findById(petId);

      const isFollowing = user.following.includes(petId);
      const isBeingFollowed = pet.followers.includes(user._id);

      console.log(isFollowing);

      if (!isFollowing && !isBeingFollowed) {
        await pet.updateOne({ $push: { followers: user._id } });
        await user.updateOne({ $push: { following: pet._id } });
        res.status(201).json({ message: `You are now following ${pet.name}.` });
      } else {
        await pet.updateOne({ $pull: { followers: user._id } });
        await user.updateOne({ $pull: { following: pet._id } });
        res
          .status(201)
          .json({ message: `You are no longer following ${pet.name}.` });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "You can't follow yourself." });
  }
});

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
    res.status(500).json(err);
  }
});

module.exports = router;
