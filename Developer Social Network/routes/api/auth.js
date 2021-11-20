const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
//after authrization
const User = require('../../models/User')
const { check, validationResult} = require ('express-validator/check');
const config=require('config');
const jwt = require('jsonwebtoken');

// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get('/', auth,async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch (err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
    
    
    }
    );

// @route   POST api/users
// @desc    Authenticate user and get token
// @access  Public

router.post('/',[
    check('email','Please enter an valid email').isEmail(),
    check('password','please is required to login').exists()
], async (req, res) => {
    
    const errors =  validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    
    }
    console.log(req.body)    

    const {email, password} = req.body; //this is coming from the user

     try {
    // after all the checks we will  follow the following sequence
    //See if user already exist,if already exist ,fail the registration
    let user = await User.findOne({ email});
    if (!user) {
        return res.status(400).json({errors :[{msg : "Invalid Credentials"}]});
    } 

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(400).json({errors :[{msg : "Invalid Credentials"}]});

    }
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

module.exports = router;