var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

require("../module/mongoose");
var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
var User = require("../module/users");
const STRINGS = require("../utils/texts");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

var newDate = new Date().toLocaleDateString();

router.get("/", function (req, res, next) {
  var cookieData = req.cookies.jwt;
  if (cookieData) {
    res.redirect("/");
  } else {
    res.render("signup", { passworderr: "", emailExist: "" });
  }
});

// here is post reqest ot create user

router.post("/", async function (req, res, next) {
  try {
    const data = req.body;

    let user = await User.findOne({ email: data.email }); // Check if user exist

    if (user)
      return res.status(404).send({ message: STRINGS.ERRORS.userExists });
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;
    user = await User.create(data);
   let users=await User.find().sort({createdAt:1})
    res.json({ message: STRINGS.TEXTS.userCreated, users });
  } catch (error) {
    console.log("Error--->", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
