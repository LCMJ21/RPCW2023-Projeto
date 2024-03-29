var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var userModel = require("../models/user");
var userController = require("../controllers/user");
var accordion = require("../controllers/accordion");
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
  res.render("user/login", { title: "Justiça login" });
});

/* GET users listing. */
router.get("/register", function (req, res, next) {
  if (req.cookies["token"]) {
    res.redirect("/");
  }
  res.render("user/register", { title: "Justiça register" });
});

/* GET users listing. */
router.get("/user", verificaAcesso, async (req, res, next) => {
  const user = await userController.getUserInfo(getJwtPayload(req).username);
  const page = Number(req.query.page || "1");
  const perPage = 20;
  const userAccordions = await accordion.getUserAccordions(
    page,
    perPage,
    user.favorites
  );

  res.cookie("previousUrl", "/users/user/?page=" + page).render("user/user", {
    title: user.name + " Page",
    user: user,
    userAccordions: userAccordions,
  });
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
          res.cookie("token", token).redirect("/");
        }
      }
    );
  }
);

router.get(
  "/permissions",
  verificaAdminAcesso,
  async function (req, res, next) {
    try {
      const user = await userController.getUserInfo(getJwtPayload(req).username);
      const users = await userController.getUsers();
      res.render("user/permissions", {
        title: "Permissões de utilizadores",
        users,
        user,
      });
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

router.post(
  "/changePermissions",
  verificaAdminAcesso,
  function (req, res, next) {
    const username = req.body.username;
    const level = req.body.level;
    userController.changePermissions(username, level).then((u) => {
      res.redirect("/users/permissions");
    });
  }
);

router.get("/edit", verificaAcesso, async function (req, res, next) {
  const user = await userController.getUserInfo(getJwtPayload(req).username);
  res.render("user/edit", {
    title: user.name + " edição",
    user: user,
  });
});

router.post("/edit", verificaAcesso, async function (req, res, next) {
  const user = await userController.getUserInfo(getJwtPayload(req).username);
  userModel.findOneAndUpdate(
    { username: user.username },
    {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      afiliation: req.body.afiliation,
      password: req.body.password,
    },
    { new: true }
  ).then((u) => {
    res.redirect("/users/user");
  }
  ).catch(err => {
    res.render("error", { error: err });
  }
  );
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
      level: Level.Consumer,
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
