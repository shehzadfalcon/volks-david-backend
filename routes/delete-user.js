require("../module/mongoose");
var express = require("express");
var router = express.Router();
var User = require("../module/users");
const STRINGS = require("../utils/texts");

router.delete("/:id", async function (req, res) {
  try {
    var id = req.params.id;
    await User.findOneAndDelete({ _id: id });
    let users = await User.find().sort({ createdAt: -1 });
    res.json({ message: STRINGS.TEXTS.userDeleted, users });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
