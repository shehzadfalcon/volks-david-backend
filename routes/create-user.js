require("../module/mongoose")
var express = require("express")
var router = express.Router()
var userModel = require("../module/users")

/* GET home page. */
router.get("/", async function (req, res) {
  try {
    var cookeData = req.cookies.jwt
    if (cookeData) {
      var currentUser = await userModel.findOne({ _id: cookeData })

      res.render("create-user", { passError: "", currentUser: currentUser })
    } else {
      res.redirect("login")
    }
  } catch (error) {}
})

router.post("/", async function (req, res) {
  try {
    var name = req.body.name
    var lastname = req.body.lname
    var email = req.body.email
    var number = req.body.phoneNumber
    var password = req.body.password
    var cpassword = req.body.cpassword

    if (password != cpassword) {
      res.render("create-user", { passError: "password does not match" })
    } else {
      // var users = await userModel.findOne({userType : "Admin"})
      // console.log(users);

      var newUser = new userModel({
        userType: "User",
        firstname: name,
        lastname: lastname,
        email: email,
        phone: number,
        password: password,
        date: new Date().toLocaleDateString(),
      })

      newUser.save(function (err, data) {
        if (err) throw err
        res.redirect("users-list")
      })
    }
  } catch (error) {}
})

module.exports = router
