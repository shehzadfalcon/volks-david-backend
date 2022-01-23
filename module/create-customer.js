var mongoose = require('./mongoose');

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : false,
    },

    email : {
        type : String,
        required : false,
    },
    phone : {
        type : Number,
        required : false,
    },
    address : {
        type : String,
        required : false
    },
    join : {
        type : String,
        required : false
    }
});


const customersList = new mongoose.model("customers", customerSchema);

module.exports = customersList