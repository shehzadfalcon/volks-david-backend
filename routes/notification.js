require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');
var invoiceList = require('../module/generate-invoice');
var jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function (req, res, next) {
  
  var cookeData = req.cookies.jwt;
  if(cookeData){
    res.render('notification');
  }else{
    res.redirect('login')
  }
});



module.exports = router;
