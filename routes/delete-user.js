require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');
var userModel = require('../module/users');

router.get('/:id', async function (req, res) {
    try {
        var id = req.params.id;

        userModel.findOneAndDelete({_id : id}).exec(function(err,data){
            if(err) throw err;
            

            res.redirect('invoice-list')
        })
        
    } catch (error) {

    }


})


module.exports = router