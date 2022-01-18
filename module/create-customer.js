var mongoose = require('./mongoose');

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : false
    },

    email : {
        type : String,
        required : true,
        unique : false
    },
    phone : {
        type : Number,
        required : true,
        unique : false
    },
    Address : {
        type : String,
        required : true
    },
    join : {
        type : String,
        required : true
    }
});


const customersList = new mongoose.model("customers", customerSchema);

module.exports = customersList