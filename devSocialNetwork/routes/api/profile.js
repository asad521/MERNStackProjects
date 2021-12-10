const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Posts = require('../../models/Post');
const {check,validationResult} = require('express-validator/check');
//for github repos
const request = require('request');
const config = require('config');

// @route   GET api/profile/me
// @desc    Get current user profile 
// @access  Private

// router.get('/', auth, (req, res) => {res.send('profile route')});
// getting a single login user profile
router.get('/me', auth, async (req, res) => {
     try {
         const profile = await Profile.findOne({user:  req.user.id}).populate('user',['name','avatar']);
        
         if(!profile) {
             return res.status(400).json({msg: "There is not profile for this userr"})
         }
         console.log(profile)

         res.json(profile);
     } catch (error) {
         console.log(error);
         res.status(500).send('Server Error in Profle Api Route')
         
     }
    });
// getting a single login user profile
// @route   POST api/profile/me
// @desc    Creat or update  user profile 
// @access  Private

router.post('/', [auth, [
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty(),
]] , async (req,res) => {
    console.log('in profile route')
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    const  {company,website,location,bio,status,githubusername,skills,
    youtube,facebook,instagram,twitter,linkedin} = req.body;

    //Build profile object
    //saving data to to database
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    githubusername
    //converting skills into array saving to model/database
    if(skills) {
        profileFields.skills = skills.split(',').map(skill =>skill.trim());
    }
    //Build Socail Object
    profileFields.social={}
    if(twitter) profileFields.social.company = twitter;
    if(linkedin) profileFields.social.company = linkedin;
    if(facebook) profileFields.social.company = facebook;
    if(instagram) profileFields.social.company = instagram;
    if(youtube) profileFields.social.company = youtube;

    try {
        let profile = await Profile.findOne({user:req.user.id});
        
        
        console.log("bELOW IS OBJECT OBJECT"); 
        console.log(req.user)
        // console.log(req.__proto__); 
        // str = JSON.stringify(user:req);
        // console.log(str); // Logs output to dev tools console.
        // alert(str);
        // console.log(profile + " This is profile after finding one")
        if(profile){
            //update\c
            console.log("if profile is true")
            profile = await Profile.findOneAndUpdate(req.user.id,{$set:profileFields},{new:true});
            return res.json(profile);

        } else {
        return res.send("aaaaaa")
      //create if not update not found
        profile =new Profile(profileFields);
        await profile.save();
        res.json(profile);
        // return res.send("asdfaf")
        }
    } catch (error) {
        res.status(500).send('Server error in profile')
        console.log(error)
    }
})
// getting  all  user profile
// @route   GET api/profile/    
// @access  Public

router.get('/', async(req,res) => {
try {
    const profiles = await Profile.find().populate('user',['name','avatar']);
    res.json(profiles);
} catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error')    
}
})

// getting  prifle by user id
// @route   GET api/profile/user/:user_id   
// @access  Public

router.get('/user/:user_id', async(req,res) => {
try {
    //user:req.params.user_id. This is because we are getting id from req
    const singleProfile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);

    if(!singleProfile) {
        return res.status(400).json({msg:"There is no profile for this userID"})
    }
    res.json(singleProfile);
} catch (error) {
    console.log(error.message);
    if(error.kind=='ObjectId')
    return res.status(400).json({msg:"There is no profile for this userID"})
    res.status(500).send('Server Error')    
}
})

// Delete   a user ,profile, posts
// @route   DELETE api/profile/    
// @access  Private

router.delete('/', auth, async(req,res) => {
try {
    //removing posts 
    await Post.deleteMany({user : req.user.id})
    //removing profile 
    await Profile.findOneAndRemove({user: req.user.id});
    //Remove User
    await User.findOneAndRemove({_id: req.user.id});
    res.json({msg: "User deleted"});
} catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error')    
}
})

// ADD   Add a profile experience
// @route   PUT api/profile/experience   
// @access  Private

router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','Company Name is required').not().isEmpty(),
    check('from','From Date is required').not().isEmpty(),
]],async (req,res) => {
    console.log('put request of add experince in backend profile.js')
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors:errors.array()});
    } 
    const {title,company,location,from,to,current,discription} =req.body;

    const newExp = {
        title:title, 
        company,    //same as above=company:company=company
        to,
        from,
        current,
        discription,
        location,
    };

    try {
        console.log('try of backend add experince');
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log('error bloack of backend ')

        console.log(error.message);
        res.status(500).send('Server Error')
                 
    }    

});
 

// Delete   Delete expereince of a user by id of expeience
// @route   DELETE api/profile/expereince/:exp_id    
// @access  Private

router.delete('/experience/:exp_id', auth, async(req,res) => {
    try {
        //finding a profile whose experience need to be remove 
        const profile = await Profile.findOne({user: req.user.id});
        //finding a correct experience to be removed in that profile
        //search thoroug all expreinces of a user and matching the id of exp with the id in request params
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')    
    }
    });

// ADD   Add a profile education
// @route   PUT api/profile/experience   
// @access  Private

router.put('/education',[auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree Name is required').not().isEmpty(),
    check('fieldofstudy','fieldofstudy  is required').not().isEmpty(),
    check('from','From Date is required').not().isEmpty(),
]],async (req,res) => {
    console.log('put request of add education in backend profile.js')

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors:errors.array()});
    } 
    const {school,fieldofstudy,degree,from,to} =req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from, 
        to
    };

    try {
        console.log('try  of backend add education')

        const profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log('error of backend add education')

        console.log(error.message);
        res.status(500).send('Server Error')
                 
    }    

});
 

// Delete   Delete education of a user by id of expeience
// @route   DELETE api/profile/expereince/:exp_id    
// @access  Private

router.delete('/education/:edu_id', auth, async(req,res) => {
    try {
        //finding a profile whose experience need to be remove 
        const profile = await Profile.findOne({user: req.user.id});
        //finding a correct experience to be removed in that profile
        //search thoroug all expreinces of a user and matching the id of exp with the id in request params
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')    
    }
    });

// getting  repos from github
// @route   GET api/profile/github/:username    
// @access  Public

router.get('/github/:username', async(req,res) => {
    try {
        const options = {
        uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=
        ${config.get( 'gitClientId')}&client_secret=${config.get('githubSecret')}`,
        method: 'GET',
        headers:{'user-agent':'node.js'},
        };
        request(options,(error,response,body)=> {
            if(error) console.log(error);
            if(response.statusCode !==200){
                res.status(404).json({msg:'No github profile'})
            }
            res.json(JSON.parse(body));
        })    
    }    catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')    
    }
    })
module.exports = router;