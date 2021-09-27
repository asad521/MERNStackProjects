const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../config/models/User");
const { check, body, validationResult, oneOf } = require("express-validator");
const auth = require("../config/middleware/auth");

// @route   GET  api/auth
//@desc     Get logged in  user
//@acess    Private
router.get("/", auth,async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error')
  }
});

// @route   POST      api/auth
//@desc     Auth user and get token
//@acess    Public
router.post(
  "/",
  [
    check("email", "Please include a vaild email").isEmail(),
    check("password", "Password is requried").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server Erwewror");
      // console.log(err);
    }
  }
);

module.exports = router;
