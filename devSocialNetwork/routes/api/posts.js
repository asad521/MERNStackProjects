const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const auth  = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const User = require('../../models/User');

// @route   POST api/posts
// @desc    create a post for a loged in user
// @access  Public

router.post('/', [auth, [
    check('text','text is required').not().isEmpty(),]], async(req, res) =>{
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({msg:error.array( )})
        }
        try {
            console.log(req)
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post( {
                text : req.body.text,
                name : user.name,
                avatar: user.avatar,
                user : req.user.id
            });

            const post = await newPost.save();
            res.json(post);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error')
            
        }
 
    });
// @route   GET api/posts
// @desc    get all posts
// @access  Private

router.get('/',auth,async (req,res) =>{
    
    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
        
    }
});

// @route   GET api/posts/:id
// @desc    get post by id 
// @access  Private

router.get('/:id',auth,async (req,res) =>{
    
    try {
        const posts = await Post.findById(req.params.id);
        if(!posts){
            return res.status(404).json({msg:"There is not Post for this User"})
        } 
        res.json(posts)
    } catch (error) {
        console.log(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:"There is not Post for this User"})
        } 
        res.status(500).send('Server Error')
        
    }
});
// @route   DELETE api/posts/:id
// @desc    delete a post by id 
// @access  Private
router.delete('/:id',auth,async (req,res) =>{
    
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:"There is not Post for this User"})
        } 
        //Check if user that delete the post ,own the post
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg:"User not Autherize"})
        }
        await post.remove();

        res.json({msg:"Post Removed"})
    } catch (error) {
        console.log(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg:"There is not Post for this User"})
        } 
        res.status(500).send('Server Error')
        
    }
});
// @route   PUT api/posts/lie/:id
// @desc    Like a post
// @access  Private

router.put('/likes/:id',auth, async (req,res) => {

    try {
        post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString()===req.user.id).length >0 ) {
            return res.status(400).json({msg:"Post already liked"})
        }
        post.likes.unshift({user:req.user.id});
        await post.save();
        res.json(post.likes);


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
        
    }
});

// @route   PUT api/posts/lie/:id
// @desc    unLike a post
// @access  Private

router.put('/unlikes/:id',auth, async (req,res) => {

    try {
        post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString()===req.user.id).length===0 ) {
            return res.status(400).json({msg:"Post has not been yet liked"})
        }//get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json({msg:"Post have been unliked"});


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
        
    }
});

// @route   POST api/posts/comments/:id
// @desc    Comment on a post
// @access  Public

router.post('/comments/:id', [auth, [
    check('text','text is required').not().isEmpty(),]], async(req, res) =>{
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({msg:error.array( )})
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newComment = {
                text : req.body.text,
                name : user.name,
                avatar: user.avatar,
                user : req.user.id
            };
            post.comments.unshift(newComment);
            await post.save();

            res.json(post.comments);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error')
            
        }
 
    });

// @route   POST api/posts/comments/:id/:comment_id
// @desc    Delete a comment
// @access  Private

router.delete('/comments/:id/:comments_id',auth,async(req,res)=> {
    try {
        const post = await Post.findById(req.params.id);
        console.log(req.user)
        // console.log("This is paramas id=>"+req.params.comments_id+"<======")
        // console.log(req)
        //put out comments
        const comment = post.comments.find(comment  =>comment.id === req.params.comments_id)
        //make sure comment exist
        if(!comment){
            return res.status(404).json({msg:"Comment not exist"})
        }
        //check user //user can only delete his comment//he can delete any of his comment
        //on any post of any profile
        console.log('asdf')
        if(comment.user.toString()  !== req.user.id){
            return res.status(404).json({msg:"User not authorized"})
        }
        const removeIndex = post.comments.map(like => comment.user.toString()).indexOf(req.user.id);
        console.log(removeIndex);
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json({msg:"comment have been removed"});

    }   catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;