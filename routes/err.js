require('../module/mongoose')
var express = require('express');
var router = express.Router();




router.get('/',function(req,res){

    res.render('err')

})


module.exports = router;