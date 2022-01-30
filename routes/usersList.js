require("../module/mongoose");
var express = require("express");
var router = express.Router();
var User = require("../module/users");

router.get("/", async function (req, res) {
  try {
    let users = await User.find({ email: { $ne: "admin@admin.com" } }).sort({
      createdAt: -1,
    });

    res.json({ users });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
