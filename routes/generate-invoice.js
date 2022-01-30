require("../module/mongoose");
var express = require("express");
var router = express.Router();
var generateInvoice = require("../module/generate-invoice");
var moment = require("moment");

var customersModel = require("../module/create-customer");
var userModel = require("../module/users");
const { GeneratePdf } = require("../utils/generatePdf");

const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    // searching cookie data
    var cookeData = req.cookies.jwt;

    customersModel.find().exec(async function (err, data) {
      try {
        if (err) throw err;

        var customerList = data;

        if (cookeData) {
          var currentUser = await userModel.findOne({ _id: cookeData });

          res.render("generate-invoice", {
            userDetial: "",
            customerList: customerList,
            currentUser: currentUser,
          });
        } else {
          res.redirect("login");
        }
      } catch (error) {}
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async function (req, res, next) {
  try {
    let data = req.body;
    let subTotal =
      data.products.length > 0 &&
      data.products
        .map((item) => item.net_price)
        .reduce((prev, curr) => prev + curr, 0);
    data.subTotal = subTotal;
    let date = Date.now();
    data.date = moment(new Date()).format("DD/MM/YYYY HH:SS");
    const fileName = `${date}.pdf`;
    const File_Path = path.join(
      __dirname,
      "../html_templates/application.html"
    );
    const source = fs.readFileSync(File_Path, "utf-8").toString();
    const template = handlebars.compile(source);
    const htmlToSend = template(data);
    const pdf = await GeneratePdf(htmlToSend);
    res.set("Content-Type", "application/pdf");
    let buff = Buffer.from(pdf, "binary");
    fs.writeFileSync(`uploads/${fileName}`, buff);
    let url = process.env.BACKEND_URL + `/uploads/${fileName}`;
    res.json({ url, fileName });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    var userID = req.params.id;

    var userDetial = await customersModel.findOne({ _id: userID });
    var customerList = await customersModel.find();

    var currentUser = await userModel.findOne({ _id: req.cookies.jwt });
    // console.log(currentUser)
    res.render("generate-invoice", {
      userDetial: userDetial,
      customerList: customerList,
      currentUser: currentUser,
    });
  } catch (error) {}
});

module.exports = router;
