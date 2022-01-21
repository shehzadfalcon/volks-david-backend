var mongoose = require("./mongoose");
const STRINGS = require("../utils/texts");

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: false,
      default: "User",
    },

    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: String,
  },
  {
    timestamps: true,
  }
)

const userModel = new mongoose.model(STRINGS.MODALS.USER, userSchema);

module.exports = userModel;
