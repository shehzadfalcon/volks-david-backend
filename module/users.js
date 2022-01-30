var mongoose = require("./mongoose");
const STRINGS = require("../utils/texts");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: false,
      enum: ["User", "Admin"],
      default: "User",
    },
    approve: {
      type: Boolean,
      default: false,
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
    notifications: [
      {
        title: String,
        description: String,
        color: { type: String, default: "#ccc" },
        statusNew: { type: Boolean, default: true },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: String,
  },
  {
    timestamps: true,
  }
);

const userModel = new mongoose.model(STRINGS.MODALS.USER, userSchema);

module.exports = userModel;
