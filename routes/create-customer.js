require("../module/mongoose");
var express = require("express");
var router = express.Router();
var Customer = require("../module/create-customer");
var userModel = require("../module/users");
const STRINGS = require("../utils/texts");

router.get("/", async function (req, res, next) {
  try {
    var cookeData = req.cookies.jwt;
    if (cookeData) {
      var currentUser = await userModel.findOne({ _id: cookeData });
      res.render("create-customer", { errMsg: "", currentUser: currentUser });
    } else {
      res.redirect("login");
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async function (req, res, next) {
  try {
    let data = req.body;
    let user = await Customer.findOne({ email: data.email }); // Check if user exist

    if (user)
      return res.status(404).send({ message: STRINGS.ERRORS.customerExists });
    await Customer.create(data);
    var customers = await Customer.find().sort({ createdAt: -1 });
    console.log(customers, "customers");
    res.json({ message: STRINGS.TEXTS.customerCreated, customers });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
