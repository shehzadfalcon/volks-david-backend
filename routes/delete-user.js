require('../module/mongoose')
var express = require('express');
var router = express.Router();
var User = require('../module/users');
const STRINGS = require("../utils/texts");

router.delete('/:id', async function (req, res) {
    try {
        var id = req.params.id;
        await User.findOneAndDelete({ _id: id });
        res.json({ message: STRINGS.TEXTS.userDeleted });

    } catch (error) {
        res.json({ message: error.message })
    }
})


module.exports = router