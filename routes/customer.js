require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');
var userModel = require('../module/users')



router.get('/', async function (req, res, next) {

    try {  
        // finding cookies 
        var cookeData = req.cookies.jwt

        // fiding customers
        var customers = await customerModel.find();
        if(customers){
            customers = customers.reverse();

            if(cookeData){

                var currentUser = await userModel.findOne({_id : cookeData});
                
                res.render('customers',{customersList : customers, currentUser : currentUser});


            }else{
                res.redirect('login')
            }
        }
    
    } catch (error) {
        

    }
});




module.exports = router;
