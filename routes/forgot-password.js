require("../module/mongoose")
var express = require("express")
var router = express.Router()
var User = require("../module/users")
const STRINGS = require("../utils/texts")
const MailService = require("../services/mail.service")
// forgot password

const forgotPassword = async (req, res) => {
  try {
    const data = req.body

    let user = await User.findOne({ email: data.email }) // Check if user exist
    if (!user)
      return res.status(404).send({ message: STRINGS.ERRORS.userNotFound })
    // check user is active
    var resetPasswordToken = Math.floor(1000 + Math.random() * 9000)
    const resetPasswordExpires = Date.now() + 900000

    user = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          resetPasswordToken: resetPasswordToken,
          resetPasswordExpires: resetPasswordExpires,
        },
      },
      {
        new: true,
      }
    )
    let emailService = new MailService()
    await emailService.sendForgotPasswordEmail(user, resetPasswordToken) //email send for verification

    res.json({ message: STRINGS.TEXTS.emailSent })
  } catch (error) {
    console.log("Error--->", error.message)
    res.status(500).json({ message: error.message })
  }
}

// reset password
const resetPassword = async (req, res) => {
  try {
    const { resetPasswordToken, password } = req.body
    let user = await User.findOne({ resetPasswordToken: resetPasswordToken }) // Check if token exist
    if (!user)
      return res.status(404).send({ message: STRINGS.ERRORS.tokenInvalid })
    if (user.resetPasswordExpires < Date.now())
      return res.status(401).send({ message: STRINGS.ERRORS.tokenExpired }) //check reset token expiration is greator than date.now()

    const salt = bcrypt.genSaltSync(15)
    const hash = await bcrypt.hash(password, salt)
    user = await User.findOneAndUpdate(
      {
        resetPasswordToken: resetPasswordToken,
      },
      {
        $set: {
          password: hash,
        },
      }
    )
    res.json({ message: STRINGS.TEXTS.passwordUpdated, user })
  } catch (error) {
    console.log("Error--->", error)
    res.status(500).json({ message: error.message })
  }
}

router.post("/", forgotPassword)

module.exports = router
