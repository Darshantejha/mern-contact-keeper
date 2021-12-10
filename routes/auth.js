const {Router} = require("express");
const router = Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
//@route   GET /api/auth
//@desc    getting logged user
//@access  private

router.get("/",auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");// we dont want the password to be sent even though it is hashed 
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:"Server Error"});

    }
});
//@route   GET /api/auth
//@desc    login page
//@access  public

router.post("/",
body("email","Please enter a valid email").isEmail(),
body("password","Please enter a password of min 6 characters").isLength({min: 6})
,async(req,res)=>{
    const errs = validationResult(req);
    if(!errs.isEmpty()){
        console.error(errs.message);
        return res.status(400).json({errors: errs.array()})
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(404).json({msg:"Invalid Credentials"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({msg:"Invalid Credentials"});
    }
    const payload = {
        user:{
            id:user.id
        }
    }
    const secret = config.get("jwtSecret");
    jwt.sign(payload,secret,{expiresIn:3600},(err,token)=>{
        if(err) throw err;
        res.json({token});
    })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:"Server Error"});
    }
    
    });

module.exports = router;