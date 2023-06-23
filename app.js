var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1/";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on("error", function () {
  console.log("Erro de conexão ao MongoDB...");
});
db.on("open", function () {
  console.log("Conexão ao MongoDB realizada com sucesso...");
});

var accordionsRouter = require("./routes/accordions");
var usersRouter = require("./routes/users");

var app = express();

// Bootstrap path includes
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js",express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
app.use("/tags",express.static(path.join(__dirname, "node_modules/bootstrap5-tags")))
app.use(
  "/icons",
  express.static(__dirname + "/node_modules/bootstrap-icons/font")
);


app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    secret: "rpcw2023",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport setup
var User = require("./models/user");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Pug local functions
/* const getStringFromObjectId = require("./utils").getStringFromObjectId;
app.locals.getStringFromObjectId = getStringFromObjectId;
TODO: REMOVED IF NOT NEEDED
*/

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", accordionsRouter);
app.use("/users", usersRouter);

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
  res.render("error");
});

module.exports = app;
