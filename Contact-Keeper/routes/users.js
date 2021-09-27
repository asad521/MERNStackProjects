const { response } = require("express");
const express = require("express");
const router = express.Router();
const config = require("config"); 
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const { check, body, validationResult, oneOf } = require("express-validator");
const User = require("../config/models/User");

// @route   POST api/users;
//@desc     Register a user
//@acess    Public

router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Email is Invalid").isEmail(),
    check(
      "password",
      "Please enter a passowrd with 6 or more character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.send('passed')
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "User already exist" });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(5);
      user.password = await bcrypt.hash(password, salt);
      await user.save();


      const payload ={
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('jwtSecret'),{
        expiresIn: 360000
      }, (err,token)=> {
        if (err) throw err;
        res.json({token})
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


//////////

module.exports = router;
