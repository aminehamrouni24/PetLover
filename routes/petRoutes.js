const auth = require("../middlewares/auth");
const Pet = require("../models/Pet");
const User = require("../models/User");
const router = require("express").Router();
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
// @desc create pet
// @private route
// @ /api/posts/createPost

router.post("/createPet",auth, upload.single("image"), async (req, res) => {
  try {
    const { name, type, breed, age, weight, height, condition , image} =req.body

    const user = await User.findOne({ id: req.user._id });
    const result = await cloudinary.uploader.upload(req.file.path);
    const pet = await Pet.create({
      name,
      type,
      breed,
      age,
      weight,
      height,
      condition,
      owner: user._id,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });
    return res.status(200).json({
      status: true,
      msg: "created successfully",
      data: pet,
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

module.exports = router
