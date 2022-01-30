var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var dotenv = require("dotenv");

// getting path of dotenv file
dotenv.config({ path: "./.env" });
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// pages routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/login");
var signupRouter = require("./routes/signup");
var logoutRouter = require("./routes/logout");
var customerRouter = require("./routes/customer");
var createCustomer = require("./routes/create-customer");
var editCustomer = require("./routes/edit-customer");
var dltCustomer = require("./routes/delete-customer");
var invoice = require("./routes/invoice");
var generateInvoice = require("./routes/generate-invoice");
var invoiceList = require("./routes/invoice-list");
var bodyParser = require("body-parser");
var logoSchema = require("./module/logo");
var notification = require("./routes/notification");
var userPageRouter = require("./routes/create-user");
var users = require("./routes/usersList");
var editUser = require("./routes/edit-user");
var editProfile = require("./routes/edit-profile");
var fileUploader = require("./routes/fileUploader");

var forgotPassword = require("./routes/forgot-password");

var deleteUser = require("./routes/delete-user");

var app = express();
// view engine setup
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

// using routers
app.use("/", indexRouter);
app.use("/login", usersRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);
app.use("/customers", customerRouter);
app.use("/create-customer", createCustomer);
app.use("/edit-customer", editCustomer);
app.use("/delete-customer", dltCustomer);
app.use("/invoice", invoice);
app.use("/generate-invoice", generateInvoice);
app.use("/invoice-list", invoiceList);
app.use("/create-user", userPageRouter);
app.use("/users-list", users);
app.use("/edit-user", editUser);
app.use("/edit-profile", editProfile);
app.use("/fileUploader", fileUploader);

app.use("/forgot-password", forgotPassword);

app.use("/delete-user", deleteUser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("err");
});

module.exports = app;
