require("../module/mongoose");
var express = require("express");
var router = express.Router();
var User = require("../module/users");
const bcrypt = require("bcrypt");
const STRINGS = require("../utils/texts");

/* GET home page. */
router.get("/", async function (req, res) {
  try {
    var cookeData = req.cookies.jwt;
    if (cookeData) {
      var currentUser = await User.findOne({ _id: cookeData });

      res.render("create-user", { passError: "", currentUser: currentUser });
    } else {
      res.redirect("login");
    }
  } catch (error) {}
});

router.post("/", async function (req, res, next) {
  try {
    const data = req.body;

    let user = await User.findOne({ email: data.email }); // Check if user exist

    if (user)
      return res.status(404).send({ message: STRINGS.ERRORS.userExists });
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;
    data.approve = true;

    user = await User.create(data);
    let users = await User.find().sort({ createdAt: -1 });
    res.json({ message: STRINGS.TEXTS.userCreated, users });
  } catch (error) {
    console.log("Error--->", error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
