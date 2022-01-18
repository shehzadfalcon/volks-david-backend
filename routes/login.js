require("../module/mongoose");
var express = require("express");
var router = express.Router();
var User = require("../module/users");
var bcrypt = require("bcrypt");
var JWT = require("jsonwebtoken");

const STRINGS = require("../utils/texts");
router.get("/", function (req, res, next) {
  var cookieData = req.cookies.jwt;
  if (cookieData) {
    res.redirect("/");
  } else {
    res.render("login", { errMsg: "" });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const data = req.body;

    let user = await User.findOne({ email: data.email }); // Check if user exist

    if (!user)
      return res.status(404).send({ message: STRINGS.ERRORS.emailInvalid });

    const isCorrect = await bcrypt.compareSync(data.password, user.password); // Check if user password is correct
    if (!isCorrect)
      return res.status(404).send({ message: STRINGS.ERRORS.passwordInvalid });

    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET); //token generation

    const result = {
      user,
      token,
    };
    res.json({ message: STRINGS.TEXTS.loginSuccess, result });
  } catch (error) {
    console.log("Error--->", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
