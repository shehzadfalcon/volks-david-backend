require("../module/mongoose")
var express = require("express")
var router = express.Router()
var customerModel = require("../module/create-customer")
var userModel = require("../module/users")

router.get("/:id", async function (req, res, next) {
  try {
    // finding cookies
    var cookeData = req.cookies.jwt

    var userID = req.params.id
    console.log(userID)
    customerModel.findOne({ _id: userID }).exec(async function (err, data) {
      try {
        if (err) throw err

        if (cookeData) {
          var currentUser = await userModel.findOne({ _id: cookeData })
          res.render("edit-customer", {
            customer: data,
            currentUser: currentUser,
          })
        } else {
          res.redirect("login")
        }
      } catch (error) {}
    })
  } catch (error) {
    res.send(error)
  }
})

router.post("/", async function (req, res, next) {
  try {
    var userID = req.body.userId
    var name = req.body.name
    var email = req.body.email
    var phone = req.body.phoneNumber
    var Address = req.body.address

    var getDate = new Date()
    customerModel
      .findOneAndUpdate(
        { _id: userID },
        {
          name: name,
          email: email,
          phone: phone,
          Address: Address,
          join: getDate,
        }
      )
      .exec(function (err, data) {
        if (err) throw err

        res.redirect("customers")
      })
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
