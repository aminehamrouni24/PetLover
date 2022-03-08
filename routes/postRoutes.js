const auth = require("../middlewares/auth");
const Post = require("../models/Post");
const User = require("../models/User");
const router = require("express").Router();
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
// @desc create post
// @private route
// @ /api/posts/createPost

router.post("/createpost", upload.single("image"), async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const user = await User.findOne({ id: req.user._id });
    const result = await cloudinary.uploader.upload(req.file.path);
    const post = await Post.create({
      title,
      description,
      postedBy: user._id,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });
    return res.status(200).json({
      status: true,
      msg: "created successfully",
      data: post,
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

// @desc get post
// @public route
// @ /api/posts/:id

router.get("/post/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const post = await Post.findById(id);
    return res.status(200).json({
      status: true,
      // msg: "created successfully",
      data: post,
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

// @desc get all posts
// @public route
// @ /api/posts/list
router.get("/list", async (req, res) => {
  try {
    const postsList = await Post.find({});
    res.status(200).json({ status: true, msg: "contacts", data: postsList });
  } catch (err) {
    res.status(500).status({ status: false, msg: err });
  }
});

// @desc update user
// @private route
// @ /api/posts/updatePost/:id
router.put("/updatePost/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ status: true, msg: "Post not found !!" });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, msg: "Updated successfully", data: updatedPost });
  } catch (err) {
    res.status(500).status({ status: false, msg: err });
  }
});

// // @desc delete post
// // @private route
// // @ /api/posts/deletePost/:id
router.delete("/deletePost/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ status: true, msg: "Post not found !!" });
    }
    await cloudinary.uploader.destroy(post.cloudinary_id);
    const deletedPost = await Post.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: true, msg: "Deleted Successfully", data: deletedPost });
  } catch (err) {
    res.status(500).status({ status: false, msg: err });
  }
});

module.exports = router;
