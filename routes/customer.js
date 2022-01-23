require("../module/mongoose");
var express = require("express");
var router = express.Router();
var Customer = require("../module/create-customer");

router.get("/", async function (req, res, next) {
  try {
    var customers = await Customer.find().sort({ createdAt: -1 });
    res.json({ customers });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
