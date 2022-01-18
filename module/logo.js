var mongoose = require("mongoose");



var imageSchema = new mongoose.Schema({
    name: String,
    img: {
        type : String
    }
});


var imageModule = new mongoose.model('Logo', imageSchema);
module.exports = imageModule;
