const mongoose = require("mongoose");


mongoose.connect(process.env.DATABASE,
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