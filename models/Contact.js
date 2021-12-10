const mongoose = require("mongoose");
const User = require("./User");
const contactSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String
    },
    type:{
        type:String,
        default:"personal"
    },
    date:{
        type:Date,
        default:Date.now
    }

});
module.exports = new mongoose.model("contact",contactSchema);