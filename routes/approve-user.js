require("../module/mongoose");
var express = require("express");
var router = express.Router();
var User = require("../module/users");
const STRINGS = require("../utils/texts");
const bcrypt = require("bcrypt");

router.get("/:id", async function (req, res) {
  try {
    let user = await User.findByIdAndUpdate(
      req.params.id,
      { approve: true },
      { new: true }
    );
    let users = await User.find().sort({ createdAt: -1 });
    res.json({ message: "User Approved Successfully", users });
  } catch (error) {
    console.log(error.message, "Error--->");
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
