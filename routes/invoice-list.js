require('../module/mongoose')
var express = require('express');
var router = express.Router();
var invoiceModel = require('../module/generate-invoice');
var customersModel = require('../module/create-customer');
var userModel = require('../module/users')


router.get('/', async function (req, res, next) {

    try {
        // finding cookies 
        var cookeData = req.cookies.jwt
        
        var currentUser = await userModel.findOne({ _id: cookeData });
        var userID = currentUser._id;
        if(currentUser.userType != "Admin"){
            var invoiceData = await invoiceModel.find({userID : userID});
          
        }else{
            var invoiceData = await invoiceModel.find();
        }
        
        var invoiceData = invoiceData.reverse();
        
        var names = []
        for (var x = 0; x < invoiceData.length; x++) {
            data = invoiceData[x].Name
            data = data.replace(" ", "-").toLowerCase()
            names.push(data)
        }

        var links = names;


        // getting cutomers list fro model
        customersModel.find().exec(async function (err, data) {
            try {


                if (err) throw err;


                var customers = data;
                if (cookeData) {

                    res.render('invoice-list', { invoiceData: invoiceData, links: links, customers: customers, currentUser: currentUser })
                } else {
                    res.redirect('login')
                }
            } catch (error) {

            }
        })



    } catch (error) {


    }
});







module.exports = router;
