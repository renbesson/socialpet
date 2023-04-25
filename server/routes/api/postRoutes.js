////////////////////////////////////////////////////////////////////////////////
//  Requires
////////////////////////////////////////////////////////////////////////////////
const Pet = require("../../models/Pet");
const Post = require("../../models/Post");
const { checkToken } = require("../../utils/checkToken");
const router = require("express").Router();
const { bucket } = require("../../config/firebase");
const multer = require("multer");
const { fromBase64 } = require("../../utils/fromBase64");
const { uploadToFirestorage } = require("../../utils/uploadToFirestorage");

const upload = multer({ dest: "images/" });

////////////////////////////////////////////////////////////////////////////////
//  Get all posts
////////////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("ownerId").sort({ updatedAt: -1 });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Get one post
////////////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  const postId = req.query.postId;

  try {
    const post = await Post.findById(postId).populate("ownerId").sort({ updatedAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Get my posts
////////////////////////////////////////////////////////////////////////////////
router.post("/myPosts", checkToken, async (req, res) => {
  try {
    const posts = await Post.find({ ownerId: req.user._id })
      .populate("ownerId")
      .sort({ updatedAt: -1 });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Get following posts
////////////////////////////////////////////////////////////////////////////////
router.post("/following", checkToken, async (req, res) => {
  const pet = await Pet.findById(req.user._id);

  try {
    const posts = [];
    // Get posts and sort them as newly updated first
    for (const following of pet.following) {
      const post = await Post.find({ ownerId: following._id })
        .populate("ownerId")
        .sort({ updatedAt: -1 });

      posts.push(...post);
    }

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Get followers posts
////////////////////////////////////////////////////////////////////////////////
router.post("/followers", checkToken, async (req, res) => {
  const pet = await Pet.findById(req.user._id);

  try {
    const posts = [];
    // Get posts and sort them as newly updated first
    for (const follower of pet.followers) {
      const post = await Post.find({ ownerId: follower._id })
        .populate("ownerId")
        .sort({ updatedAt: -1 });

      posts.push(...post);
    }

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Get all posts of a user
////////////////////////////////////////////////////////////////////////////////
router.post("/pet", checkToken, async (req, res) => {
  const petId = req.query.petId;

  try {
    const posts = await Post.find({ ownerId: petId }).populate("ownerId").sort({ updatedAt: -1 });
    const pet = await Pet.findById(petId);
    const { _id, name, email, avatar, location } = pet;

    res.status(200).json({ pet: { _id, name, email, avatar, location }, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Create a post
////////////////////////////////////////////////////////////////////////////////
router.post("/", checkToken, async (req, res) => {
  const fileAsString = req.body.fileAsString;
  const id = req.user._id;

  // Saves the post to the database
  try {
    const newPost = new Post({
      ownerId: id,
      mediaUrl: "",
      content: req.body.content,
    });

    // Uploads the image to firebase storage and saves its URL to 'mediaUrl'
    if (fileAsString) {
      const { fileBuffer, remotePath } = await fromBase64(fileAsString);
      const { url } = await uploadToFirestorage(bucket, fileBuffer, remotePath);

      // Sets the url to the mediaUrl property
      newPost.mediaUrl = url[0];
    }

    // Saves the post to the database
    const post = await newPost.save();

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Update a post
////////////////////////////////////////////////////////////////////////////////

router.put("/", checkToken, async (req, res) => {
  const { content, fileAsString } = req.body;
  const postId = req.query.postId;

  // Gets the post and checks if the requester is the owner
  const post = await Post.findById(postId);

  // Code 401 - Unauthorized
  if (req.user._id != post?.ownerId)
    return res.status(401).json({ message: "You are not the owner!" });

  try {
    // Uploads the image to firebase storage and saves its URL to 'mediaUrl'
    if (fileAsString) {
      const { fileBuffer, remotePath } = await fromBase64(fileAsString);
      const { url } = await uploadToFirestorage(bucket, fileBuffer, remotePath);

      await post.updateOne({
        $set: { content, mediaUrl: url[0] },
      });
    } else {
      await post.updateOne({
        $set: { content, mediaUrl: "" },
      });
    }
    // Code 200 - Accepted
    res.status(200).json({ message: "Post Updated." });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Toggle like/unlike a post
////////////////////////////////////////////////////////////////////////////////
router.post("/like", checkToken, async (req, res) => {
  const postId = req.query.postId;

  try {
    const post = await Post.findById(postId);
    const isLiking = post.likedBy.includes(req.user._id);

    if (!isLiking) {
      await post.updateOne({ $push: { likedBy: req.user._id } });
      res.status(201).json({ message: "Post has been liked." });
    } else {
      await post.updateOne({ $pull: { likedBy: req.user._id } });
      res.status(200).json({ message: "Post has been unliked." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
// Delete a post
////////////////////////////////////////////////////////////////////////////////
router.delete("/", checkToken, async (req, res) => {
  const postId = req.query.postId;

  const post = await Post.findById(postId);

  // Code 401 - Unauthorized
  if (req.user._id != post?.ownerId)
    return res.status(401).json({ message: "You are not the owner!" });

  try {
    await post.deleteOne();

    res.status(200).json({ message: "Post Deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
