const {Router} = require("express");
const router = Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//@route  POST /api/users
//@desc   register a user
//@access public
router.post("/",
body("name","Please enter a name").not().isEmpty(), // validating not to be empty if it is empty then "Please enter a name" will be send 
body("email","Please enter a valid email").isEmail(),
body("password","Please enter a password of min 6 characters").isLength({min: 6})
,async(req,res)=>{
    const errs = validationResult(req);
    if(!errs.isEmpty()){
        console.error(errs.message);
        return res.status(400).json({errors: errs.array()})
    }
    try {
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: "User already exists"}); // checking if the user already exists and if so sending status 400 as bad request
        }
        
        user = new User({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10); // 10 rounds of salts
        user.password = await bcrypt.hash(password,salt);
        await user.save(); // hashing the password before saving it 

        const payload = {
            user:{
                id: user.id
            }
        }
        const secret = config.get("jwtSecret");
        jwt.sign(payload,secret,{expiresIn: 3600},(err,token)=>{
            if(err) throw err; // which gonna be catched by the catch block
            res.json({token:token});
        })
        // or 
        // let token = jwt.sign(payload,secret,{expiresIn:3600});
        // if(token){
        //     res.json({token});
        // }
        // if token is not produced and if there is an error it will be catched by the catch block



    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg:"Server Error"});
        
    }
    


    


});
















module.exports = router;