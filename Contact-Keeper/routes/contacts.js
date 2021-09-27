const express = require('express');
const router  = express.Router();
const { check, body, validationResult, oneOf } = require("express-validator");
const User = require("../config/models/User");
const auth = require("../config/middleware/auth");

const Contact = require("../config/models/contacts");


// @route   GET  api/contacts
//@desc     Get allusers contacts
//@acess    Private
router.get('/' ,auth, async (req,res)=> {
    console.log(req)
    console.log(res)
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date:-1});
        res.json(contacts);
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }

});

// @route   PUT api/contacts/:id
//@desc     Update Contactas
//@acess    Private
router.put('/:id',auth ,async(req,res)=> {
    const {name, email, phone,  type,password} =req.body;

    //Build a contact object
    const  contactFields ={};
    if(name) contactFields.name=name;
    if(email) contactFields.email=email;
    if(phone) contactFields.phone=phone;
    if(type) contactFields.type=type;
    try {
        let contact = await  Contact.findById(req.params.id);
        
        if(!contact) return res.status(404).json({msg:'Contact not found'});

        //Make sure user own contact/cannot change others user contact
        if (contact.user.toString() !== req.user.id) {
            res.status(401).json({msg:'Not Authorize'});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set:contactFields},
            {new :true});

            res.json(contact)
    } catch {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   POST api/contacts
//@desc    A Add new contact
//@acess    Public
router.post('/' ,[auth, [
    check('name','Name is requred').not().isEmpty()
]],async (req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, phone,  type,password} =req.body;
    try {
        const newContact =  new Contact({
            name,
            email,
            phone,
            type,
            user : req.user.id
        });
        
        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Serverasdf Error')
    }
});

// @route   DELETE api/contacts/:id
//@desc     Delete Contacts
//@acess    Private
router.delete('/:id' ,auth, async (req,res)=> {
    try {
        let contact = await  Contact.findById(req.params.id);
        
        if(!contact) return res.status(404).json({msg:'Contact not found'});

        //Make sure user own contact/cannot change others user contact
        if (contact.user.toString() !== req.user.id) {
            res.status(401).json({msg:'Not Authorize'});
        }

        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg:"Contact Removed"})
    } catch {
        console.log(err.message);
        res.status(500).send('Server Error')
    }});

module.exports  =   router;