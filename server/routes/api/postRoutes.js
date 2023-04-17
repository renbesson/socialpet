////////////////////////////////////////////////////////////////////////////////
//  Requires
////////////////////////////////////////////////////////////////////////////////
const Pet = require("../../models/Pet");
const Post = require("../../models/Post");
const { checkToken } = require("../../utils/checkToken");
const router = require("express").Router();

////////////////////////////////////////////////////////////////////////////////
//  Get one post **TODO**
////////////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  const postId = req.query.postId;

  try {
    const post = await Post.findById(postId).populate("ownerId");
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Post a post
////////////////////////////////////////////////////////////////////////////////
router.post("/", checkToken, async (req, res) => {
  try {
    const newPost = new Post({
      ownerId: req.user._id,
      mediaUrl: req.body.mediaUrl,
      content: req.body.content,
    });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Update a post
////////////////////////////////////////////////////////////////////////////////
router.put("/", checkToken, async (req, res) => {
  const postId = req.query.postId;

  // Gets the post and checks if the requester is the owner
  const post = await Post.findById(postId);

  // Code 401 - Unauthorized
  if (req.user._id !== post._doc.ownerId)
    return res.status(401).json({ message: "You are not the owner!" });

  try {
    // Destructuring to make sure only these proprieties get updated
    const { content, comments, mediaUrl } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: { content, comments, mediaUrl },
      },
      { new: true }
    );

    // Code 201 - Created
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Toggle like/unlike a post **TODO**
////////////////////////////////////////////////////////////////////////////////
router.put("/:id/follow", checkToken, async (req, res) => {
  const postId = req.query.postId;

  try {
    const pet = await Pet.findById(req.params.id);
    const currentPet = await Pet.findById(req.body.petId);
    if (!pet.followers.includes(req.body.petId)) {
      await pet.updateOne({ $push: { followers: req.body.petId } });
      await currentPet.updateOne({ $push: { followings: req.params.id } });
      res.status(200).json({ message: "pet has been followed" });
    } else {
      res.status(403).json({ message: "you allready follow this pet" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
// Delete a post **TODO**
////////////////////////////////////////////////////////////////////////////////
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.petId !== req.params.id) {
    try {
      const pet = await Pet.findById(req.params.id);
      const currentPet = await Pet.findById(req.body.petId);
      if (pet.followers.includes(req.body.petId)) {
        await pet.updateOne({ $pull: { followers: req.body.petId } });
        await currentPet.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ message: "pet has been unfollowed" });
      } else {
        res.status(403).json({ message: "you dont follow this pet" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "you cant unfollow yourself" });
  }
});

module.exports = router;
