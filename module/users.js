var mongoose = require('./mongoose');
const STRINGS = require("../utils/texts")

const userSchema = new mongoose.Schema({
    userType : {
        type : String,
        required : true,
    },
    role: {
        type: String,
        default:'user'
    },
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    }
});


const userModel = new mongoose.model(STRINGS.MODALS.USER, userSchema)

module.exports = userModel