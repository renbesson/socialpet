////////////////////////////////////////////////////////////////////////////////
//  Requires
////////////////////////////////////////////////////////////////////////////////
const { bucket } = require("../../config/firebase");
const Pet = require("../../models/Pet");
const { checkToken } = require("../../utils/checkToken");
const { fromBase64 } = require("../../utils/fromBase64");
const { uploadToFirestorage } = require("../../utils/uploadToFirestorage");
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
    console.error(err);
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
    console.error(err);
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
      console.error(err);
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
    const fileAsString = req.body.fileAsString;
    const id = req.user._id;

    const { fileBuffer, remotePath } = await fromBase64(fileAsString, id);

    const { url } = await uploadToFirestorage(bucket, fileBuffer, remotePath);

    await Pet.findByIdAndUpdate(id, { avatar: url[0] }, { new: true });

    res.status(201).json({ url: url[0], message: "Avatar Updated!" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
