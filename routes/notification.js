require("../module/mongoose");
var express = require("express");
var router = express.Router();
var customerModel = require("../module/create-customer");
var User = require("../module/users");
var jwt = require("jsonwebtoken");

// update user notification
// exports.updateNotifications = asyncHandler(async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const requestedUser = await User.findById(req.user.id);
//     if (!requestedUser.type) {
//       res.status(400).send({ message: "You are not authorized to get Job" });
//     }
//     let tempNotify;
//     // console.log(loggedInUser, "loggedIn");
//     if (requestedUser.type === "student") {
//       let user = await Student.findById(requestedUser.student).populate(
//         "student"
//       );
//       tempNotify = user.notifications;
//       await Student.findOneAndUpdate(
//         { _id: user._id },
//         {
//           $set: {
//             "notifications.$[el].statusNew": false,
//             "notifications.$[el].color": "white",
//           },
//         },
//         {
//           arrayFilters: [{ "el._id": `${userId}` }],
//           new: true,
//         }
//       );
//     } else if (requestedUser.type === "company") {
//       let user = await Company.findById(requestedUser.company).populate(
//         "company"
//       );

//       tempNotify = user.notifications;
//       await Company.findOneAndUpdate(
//         { _id: user._id },
//         {
//           $set: {
//             "notifications.$[el].statusNew": false,
//             "notifications.$[el].color": "#fff",
//           },
//         },
//         {
//           arrayFilters: [{ "el._id": `${userId}` }],
//           new: true,
//         }
//       );
//     }

//     res.status(200).json({ message: "Success!", notifications: tempNotify });
//   } catch (err) {
//     next(err);
//   }
// });
/* GET home page. */
router.get("/", async function (req, res) {
  try {
    let requestedUser = await User.findOne({ role: "Admin" });
    const notifications = requestedUser.notifications.filter(
      (not) => not.statusNew == true
    );
    let sortedArray = notifications.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.status(200).json({ message: "Success!", notifications: sortedArray });
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
