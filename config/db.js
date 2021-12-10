const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async()=>{
    try {
        await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log("MongoDB unable to connect due to some error");   
    }

}
module.exports = connectDB;