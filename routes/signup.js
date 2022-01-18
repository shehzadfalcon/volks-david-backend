var dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

require("../module/mongoose")
var express = require("express")
var router = express.Router()
const bcrypt = require("bcrypt")
var usersModel = require("../module/users")
const jwt = require("jsonwebtoken")

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage
  localStorage = new LocalStorage("./scratch")
}

var newDate = new Date().toLocaleDateString()

router.get("/", function (req, res, next) {
  var cookieData = req.cookies.jwt
  if (cookieData) {
    res.redirect("/")
  } else {
    res.render("signup", { passworderr: "", emailExist: "" })
  }
})

// here is post reqest ot create user

router.post("/", async function (req, res, next) {
  try {
    var fname = req.body.fname
    var lname = req.body.lname
    var email = req.body.email
    var phnNumber = req.body.phnNumber
    var password = req.body.password
    var cpassword = req.body.confirmPassword

    // getting length of accounts
    var accounts = await usersModel.find()
    var accountLength = accounts.length

    if (password == cpassword) {
      password = bcrypt.hashSync(password, 10)
      var userData = new usersModel({
        userType: "Admin",
        firstname: fname,
        lastname: lname,
        email: email,
        phone: phnNumber,
        password: password,
        date: newDate,
      })

      usersModel.findOne({ email: email }).exec(function (err, data) {
        if (err) throw err

        if (data) {
          res.render("signup", {
            passworderr: "",
            emailExist: "email already exist",
          })
        } else {
          userData.save(function (err, data) {
            if (err) throw err

            const token = jwt.sign({ id: data }, process.env.SECRETKEY)
            const userVarify = jwt.verify(token, process.env.SECRETKEY)
            res.cookie("jwt", userVarify.id._id, {
              httpOnly: true,
            })

            res.redirect("/")
          })
        }
      })
    } else {
      res.render("signup", {
        passworderr: "password does not match",
        emailExist: "",
      })
    }
  } catch (error) {}
})

module.exports = router
