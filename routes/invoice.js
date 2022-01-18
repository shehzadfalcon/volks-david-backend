require('../module/mongoose')
var express = require('express');
var router = express.Router();
var invoiceModel = require('../module/generate-invoice')


/* GET home page. */
router.get('/:name/:id', async function (req, res, next) {
  try {
    // finding cookies 
    var cookeData = req.cookies.jwt

    var userID = req.params.id;
    var currentUser = await invoiceModel.findOne({ _id: userID })
    
    var InvoiceItem = currentUser.InvoiceItem;
    InvoiceItem = JSON.parse(InvoiceItem);

    var number = Intl.NumberFormat('en-US')

    var invoiceData = []
    for(var x =0; x <InvoiceItem.length; x++){
      InvoiceItem[x].unitPrice = number.format(InvoiceItem[x].unitPrice)
      InvoiceItem[x].totalPrice = number.format(InvoiceItem[x].totalPrice)
      InvoiceItem[x].netPrice = number.format(InvoiceItem[x].netPrice)

      var newAry = InvoiceItem[x]
      invoiceData.push(newAry)
    }

    if(cookeData){
      res.render('invoice', {InvoiceItem : invoiceData, currentUser : currentUser});
    }else{
      res.redirect('login')
    }


  } catch (error) {
      
  }

});



module.exports = router;
