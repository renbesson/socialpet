////////////////////////////////////////////////////////////////////////////////
//  Requires
////////////////////////////////////////////////////////////////////////////////
const Pet = require("../../models/Pet");
const Post = require("../../models/Post");
const { checkToken } = require("../../utils/checkToken");
const router = require("express").Router();
const { bucket } = require("../../config/firebase");
const multer = require("multer");

const upload = multer({ dest: "images/" });

////////////////////////////////////////////////////////////////////////////////
//  Get all posts
////////////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Get one post **TODO**
////////////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  const postId = req.query.postId;

  try {
    const post = await Post.findById(postId).populate("ownerId");
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
    const posts = await Post.find({ ownerId: req.user._id });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Get following posts
////////////////////////////////////////////////////////////////////////////////
router.post("/following", checkToken, async (req, res) => {
  const petId = req.query.petId;

  const pet = await Pet.findById(req.user._id);

  try {
    const posts = [];
    // Get posts and sort them as newly updated first
    for (const following of pet.following) {
      const post = await Post.find({ ownerId: following._id });

      posts.push(post[0]);
    }

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Post a post
////////////////////////////////////////////////////////////////////////////////
router.post("/", checkToken, async (req, res) => {
  // Saves the post to the database
  try {
    const newPost = new Post({
      ownerId: req.user._id,
      mediaUrl: "",
      content: req.body.content,
    });

    // Uploads the image to firebase storage and saves its URL to 'mediaUrl'
    if (req.body.fileAsString) {
      // Raw base64 File
      const fileBase64 = req.body.fileAsString;

      // Just the bytes without the metadata (needed to upload to firebase storage)
      const fileBytes = fileBase64.split(",")[1];

      // Creates a buffer with the fileBytes
      const fileBuffer = Buffer.from(fileBytes, "base64");

      // Gets only the file extension
      const fileExtension = fileBase64.split(";")[0].split("/")[1];

      // Sets the path for the file on the remote server
      const remotePath = `images/${newPost.id}.${fileExtension}`;

      const file = bucket.file(remotePath);

      const sendFile = () =>
        new Promise((resolve, reject) => {
          file
            .createWriteStream()
            .on("error", (err) => {
              reject(err);
            })
            .on("finish", async () => {
              const url = await file.getSignedUrl({
                version: "v2",
                action: "read",
                expires: Date.now() + 60 * 60 * 100000000,
              });
              resolve(url[0]);
            })
            .end(fileBuffer);
        });
      const url = await sendFile();

      // Sets the url to the mediaUrl property
      newPost.mediaUrl = url;
    }

    // Saves the post to the database
    const post = await newPost.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Update a post
////////////////////////////////////////////////////////////////////////////////

router.put("/", [checkToken, upload.single("image")], async (req, res) => {
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
//  Toggle like/unlike a post
////////////////////////////////////////////////////////////////////////////////
router.post("/like", checkToken, async (req, res) => {
  const postId = req.query.postId;

  try {
    const post = await Post.findById(postId);
    const isLiking = post.likedBy.some((id) => id.equals(req.user._id));

    if (!isLiking) {
      await post.updateOne({ $push: { likedBy: req.user._id } });
      res.status(201).json({ message: "Post has been liked." });
    } else {
      await post.updateOne({ $pull: { likedBy: req.user._id } });
      res.status(200).json({ message: "Post has been unliked." });
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
