require("../module/mongoose")
var express = require("express")
var router = express.Router()
var customerModel = require("../module/create-customer")
var userModel = require("../module/users")
const STRINGS = require("../utils/texts")

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

router.put("/:id", async function (req, res) {
  try {
    let body = req.body;
    let user = await customerModel.findByIdAndUpdate(req.params.id, body,{new:true})
    res.json({ message: STRINGS.TEXTS.customerUpdated,user })
  } catch (error) {
    console.log(error.message,  "Error--->")
      res.status(500).json({ message: error.message })
  }
})

module.exports = router
