require("../module/mongoose");
var express = require("express");
var router = express.Router();
var Customer = require("../module/create-customer");
const STRINGS = require("../utils/texts");

router.delete("/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    await Customer.findOneAndDelete({ _id: id });
    var customers = await Customer.find().sort({ createdAt: -1 });

    res.json({ message: STRINGS.TEXTS.customerDeleted, customers });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
