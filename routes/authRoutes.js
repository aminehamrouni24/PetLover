const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = require("express").Router();
constUser = require("../models/User");

// @desc register user
// @public route
// @ /api/users/register
router.post("/register", async (req, res) => {
  // checking user fields
  try {
    const { name, password, email, country , isAdmin } = req.body;
    if (!name || !password || !email || !country) {
      return res
        .status(400)
        .json({ status: true, msg: "All Fields are required !!" });
    }
    // checking user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: true, msg: "User already exists !!" });
    }
    //  preparing for hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      country,
      email,
      password: hashedPassword,
      isAdmin 
    });
    return res
      .status(200)
      .json({ status: true, msg: "User created successfully", data: user });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

// @desc login user
// @public route
// @ /api/users/login

router.post("/login", async (req, res) => {
  // checking user fields
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const verify_user = await bcrypt.compare(password, user.password);
      if (verify_user) {
        const token = await jwt.sign(
          { id: user._id, email: user.email },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          status: true,
          msg: "Logged in successfully",
          token: token,
          data: user._id,
        });
      } else {
        return res.status(400).json({ status: true, msg: "Wrong Password!!" });
      }
    } else {
      return res
        .status(400)
        .json({ status: true, msg: "User doesn't exit !!" });
    }
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

module.exports = router;
