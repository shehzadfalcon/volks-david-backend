require("../module/mongoose");
var express = require("express");
var router = express.Router();
var User = require("../module/users");
const STRINGS = require("../utils/texts");
const bcrypt = require("bcrypt");

router.get("/:id", async function (req, res) {
  try {
    var cookieData = req.cookies.jwt;
    var selectedItemID = req.params.id;

    if (cookieData) {
      var currentUser = await User.findOne({ _id: cookieData });
      var currentSelectedITem = await User.findOne({
        _id: selectedItemID,
      });
      res.render("edit-user", {
        currentUser: currentUser,
        currentSelectedITem: currentSelectedITem,
      });
    } else {
      res.redirect("login");
    }
  } catch (error) {}
});

router.put("/:id", async function (req, res) {
  try {
    let body = req.body;
    let user = await User.findOne({ email: body.email });

    if (body.password) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(body.password, salt);
      body.password = hash;
      user = await User.findByIdAndUpdate(req.params.id, body, { new: true });
    } else {
      body.password = user.password;
      user = await User.findByIdAndUpdate(req.params.id, body, { new: true });
    }

    res.json({ message: STRINGS.TEXTS.profileUpdated, user });
  } catch (error) {
    console.log(error.message, "Error--->");
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
