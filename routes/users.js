var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var userModel = require("../models/user");
var passport = require("passport");
const { verificaAcesso } = require("./security");

/* GET users listing. */
router.get("/login", function (req, res, next) {
  res.render("user/login", { title: "Justice login" });
});

/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.render("user/register", { title: "Justice register" });
});

/* GET users listing. */
router.get("/user", verificaAcesso, function (req, res, next) {
  example_user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    afiliation: "University of Toronto",
    role: "Student",
    access: "Admin",
    register_date: "2021-01-01",
    last_login: "2021-01-01",
    favorites: [1, 2, 3],
    acordoes: [
      {
        id: 1,
        name: "Example 1",
        description: "Example description 1",
        url: "https://example.com/1",
      },
      {
        id: 2,
        name: "Example 2",
        description: "Example description 2",
        url: "https://example.com/2",
      },
    ],
  };
  res.render("user/user", { title: "Justice user", user: example_user });
});

router.post(
  "/login",
  passport.authenticate("local"),
  function (req, res, next) {
    jwt.sign(
      { username: req.user.username, level: req.user.level, sub: "Justice" },
      "justiceApp",
      { expiresIn: "1h" },

      function (e, token) {
        if (e)
          res.status(500).jsonp({ error: "Erro na geração do token: " + e });
        else res.render("/user/login", { token: token });
      }
    );
  }
);

router.post("/register", function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  userModel.register(
    new userModel({
      username: req.body.username,
      name: req.body.name,
      afiliation: req.body.afiliation,
      dateCreated: data,
    }),
    req.body.password,
    function (err, user) {
      if (err)
        res
          .status(520)
          .jsonp({ error: err, message: "Register error: " + err });
      else res.redirect("/users/login");
    }
  );
});

module.exports = router;
