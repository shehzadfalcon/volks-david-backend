var mongoose = require('./mongoose');

var generateInvoice = new mongoose.Schema({
    userID : {
        type : String,
        required : true,
    },
    Name : {
        type : String,
        required : true,
    },
    Address : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true,
    },
    Phone : {
        type : String,
        required : true
    },
    NTNNumber :{
        type : String,
        required : true
    },
    InvoiceNo : {
        type : String,
        required : true
    },
    INCNumber : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    InvoiceItem: {
        type : String,
        required : true
    },
    SubTotal : {
        type : String,
        required : true
    },
    Tax : {
        type : String,
        require : true
    },
    GrandTotal : {
        type : String,
        required : true
    },
    AmountInWords : {
        type : String,
        require : true
    },

    Payment_Method : {
        type : String,
        require : true
    },
    Account_Title : {
        type : String,
        require : true
    },
    Account_Number : {
        type : String,
        require : true
    }
    
});


var generateInvoice = new mongoose.model("Generate-invocie", generateInvoice);
 
module.exports = generateInvoice;