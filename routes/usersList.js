require('../module/mongoose')
var express = require('express');
var router = express.Router();
var userLIst = require('../module/users');
var userModel = require('../module/users')

router.get('/', async function (req, res) {
   try {


      var userData = await userLIst.find()
      // console.log(userData)
      var typeUserList = [];
      userData.forEach(function (item) {
         if (item.userType == "User") {
            typeUserList.push(item)
         }
      })

      userslist = typeUserList.reverse();

      var cookeData = req.cookies.jwt;
      if (cookeData) {

         var currentUser = await userModel.findOne({_id :cookeData});
         
         res.render('usersList', { userslist: userslist, currentUser: currentUser});

      } else {
         res.redirect('login')
      }


   } catch (error) {


   }
});








module.exports = router;