const express = require('express');
const router = express.Router();
const gravatar =  require('gravatar');
const { check, validationResult} = require ('express-validator/check');

const bcrypt = require('bcryptjs'); 
const User = require('../../models/User');
// for json webtoken
const jwt = require('jsonwebtoken');
const config=require('config');

// @route   GET api/users
// @desc    Test route
// @access  Public

// @route   POST api/users
// @desc    Register route
// @access  Public

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please enter an valid email').isEmail(),
    check('password','please enter pass with more than 8 character').isLength({min:8})
], async (req, res) => {
    
    const errors =  validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    
    }
    console.log(req.body)    

    const {name, email, password} = req.body; //this is coming from the user

     try {
    // after all the checks we will  follow the following sequence
    //See if user already exist,if already exist ,fail the registration
    let user = await User.findOne({ email});
    if (user) {
        return res.status(400).json({errors :[{msg : "User already Exists"}]});
    }
    //Get the user avatar
    const avatar =  gravatar.url(email,{
        s : '200',
        r : 'pg',
        d : 'mm',
    })
    // below is for monodb,creating instance of newly created user
    user = new User({
        name,
        email,
        password,
        avatar
    })
    //Encrypt the password
     console.log(user.password +"This is passwored")
     const salt = await bcrypt.genSalt(10);
     user.password = await  bcrypt.hash(password,salt);
     
    // after password is hashed, we will save it to database
     await user.save();
    //  res.send('User is Registered')
     //Sent Jsonwebtoken ,this is to login the user directly after registeration
    const payload = {
        user : {
            id: user.id
        }
    } 
    //jwt
    jwt.sign(payload, config.get('jwtSecret'),{expiresIn: 3600000}, 
    (err,token)=> {
        if(err) throw err;
        res.json({token});
    });

    } catch (error) {
         console.log(error.message);
         console.log(error);

         res.status(500).send('Server error')
                  
     }
    }
);


module.exports = router;    // export the router   