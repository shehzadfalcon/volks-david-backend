require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');
var userModel = require('../module/users')


router.get("/:id", async function(req,res){
    try {
        var cookieData = req.cookies.jwt
        var selectedItemID = req.params.id;
        
        if (cookieData) {

            var currentUser = await userModel.findOne({_id : cookieData}) 
            var currentSelectedITem = await userModel.findOne({_id : selectedItemID});
            res.render('edit-user',{currentUser : currentUser, currentSelectedITem : currentSelectedITem});
            
          } else {
            res.redirect('login')
          }

    } catch (error) {
        
    }
})

router.post("/", async function(req,res){
    try {
        var id = req.body.currentUserID
        var firstname = req.body.name
        var lastname = req.body.lname
        var email  = req.body.email
        var phone = req.body.phoneNumber
        var password = req.body.password

        var selectedUser = await userModel.findOne({_id : id})
        
        userModel.findOneAndUpdate({_id : id},{
            userType: selectedUser.userType,
            userID : selectedUser.userID,
            firstname:firstname,
            lastname : lastname,
            email : email,
            phone : phone,
            password : password,
            date : new Date().toLocaleDateString()
        }).exec(function(err,data){
            if (err) throw err;

            res.redirect('users-list')
        });

        
    } catch (error) {

    }
})



module.exports = router;