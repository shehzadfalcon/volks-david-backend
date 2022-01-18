const mongoose = require("mongoose");
var dotenv = require('dotenv');

// getting path of dotenv file
dotenv.config({path : "./config.env"})


mongoose.connect(process.env.DATABSE,
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex : true,
    
}).then(function(){
    console.log("mongoose connected successfully")
}).catch(function(err){
    console.log(err)
    console.log("mongoose not connected")
})

module.exports = mongoose;