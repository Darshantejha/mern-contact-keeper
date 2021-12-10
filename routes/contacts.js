const {Router} = require("express");
const router = Router();
const { body, validationResult } = require('express-validator');
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");

//@route  GET /api/contacts
//@desc   get the contact list
//@access private
router.get("/",auth,async(req,res)=>{
    try {
        const users = await Contact.find({id: req.user.id});
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:"Server error"});
    }
});

//@route  POST /api/contacts
//@desc   add a new contact
//@access private
router.post("/",auth,
body("email","Please enter a valid email").isEmail()
,async(req,res)=>{
    try {
        const{name,email,phonenumber,type} = req.body;
        const newContact = new Contact({
            name,
            email,
            phonenumber,
            type,
            id: req.user.id
    });
        await newContact.save();
        res.json(newContact);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:"Server Error"});
        
    }
    
});

//@route  PUT /api/contacts
//@desc   update a contact
//@access private
router.put("/:id",auth,async(req,res)=>{
    try {
        const {name,email,phonenumber,type} = req.body;
        const contact = await Contact.findByIdAndUpdate(req.params.id,{$set:{name:name,email:email,phonenumber:phonenumber,type:type}});
        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:"Server Error"});
    }
});

//@route  DELETE /api/contacts
//@desc   delete a contact
//@access private
router.delete("/:id",auth,async(req,res)=>{
    try {
        await Contact.remove({_id: req.params.id});
        res.json({msg:"Contact deleted"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:"Server Error"});
    }
});



module.exports = router;