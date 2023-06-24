var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var userModel = require("../models/user");
var user = require("../controllers/user");
var passport = require("passport");
const {
  verificaAcesso,
  getJwtPayload,
  verificaAdminAcesso,
} = require("./security");
const { Level } = require("../utils/enums");

/* GET users listing. */
router.get("/login", function (req, res, next) {
  if (req.cookies["token"]) {
    res.redirect("/");
  }
  res.render("user/login", { title: "Justice login" });
});

/* GET users listing. */
router.get("/register", function (req, res, next) {
  if (req.cookies["token"]) {
    res.redirect("/");
  }
  res.render("user/register", { title: "Justice register" });
});

/* GET users listing. */
router.get("/user", verificaAcesso, async (req, res, next) => {
  const u = await user.getUserInfo(getJwtPayload(req).username);

  res.render("user/user", { title: "Justice user", user: u });
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
        else {
          user;
          res.cookie("token", token).redirect("/");
        }
      }
    );
  }
);

router.get("/permissions", function (req, res, next) {
  const username = getJwtPayload(req).username;
  user.getUsers().then((users) => {
    res.render("user/permissions", {
      title: "Justice permissions",
      users,
      username,
    });
  });
});

router.post("/changePermissions", function (req, res, next) {
  const username = req.body.username;
  const level = req.body.level;
  console.log(username, level);
  user.changePermissions(username, level).then((u) => {
    console.log(u);
    res.redirect("/users/permissions");
  });
});

router.post("/register", function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  userModel.register(
    new userModel({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      afiliation: req.body.afiliation,
      dateCreated: data,
      level: Level.Admin,
      lastAccess: data,
      favorites: [],
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

router.post("/logout", function (req, res, next) {
  res.clearCookie("token").redirect("/users/login");
});

module.exports = router;
