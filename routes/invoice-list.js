require("../module/mongoose");
var express = require("express");
var router = express.Router();
var Invoices = require("../module/generate-invoice");
var customersModel = require("../module/create-customer");
var userModel = require("../module/users");

router.get("/", async function (req, res, next) {
  try {
    var invoices = await Invoices.find({});
    res.json({ invoices });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
