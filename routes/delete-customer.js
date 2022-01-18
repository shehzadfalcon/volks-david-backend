require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');



router.get('/:id', async function (req, res, next) {
    try {

        var userID = req.params.id;
        // console.log(userID)

        await customerModel.findOneAndRemove({_id : userID}).exec(function(err,data){
            if (err) throw err;

            res.redirect('/customers')
        })


    } catch (error) {
        res.send(error)
    }
});




module.exports = router;
