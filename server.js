const express = require("express");
const app = express();
const PORT = process.env.PORT||5000;
const connectDB = require("./config/db");



// connecting to mongoDB
connectDB();


//middleware 
app.use(express.json({extended:false}));

//routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/users",require("./routes/users"));
app.use("/api/contacts",require("./routes/contacts"));



app.get("/",(req,res)=>{res.send("Hello brother")});
app.listen(PORT,(req,res)=>{
    console.log(`server listening on port ${PORT}`);
})