var express = require("express");
var router = express.Router();
var accordions = require("../controllers/accordion");
const {
  verificaAcesso,
  verificaAdminAcesso,
  getJwtPayload,
} = require("./security");
const { removeFavorite, addFavorite } = require("../controllers/user");

function getUser() {
  return (example_user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    afiliation: "University of Toronto",
    role: "Student",
    isAdmin: true,
    register_date: "2021-01-01",
    last_login: "2021-01-01",
    favorites: ["648b6c60a18f09293cb6930c", 3],
  });
}

router.get("/", verificaAcesso, async function (req, res, next) {
  try {
    const page = Number(req.query.page || "1");
    const perPage = 20;
    const accordions_list = await accordions.list(page, perPage);
    res.render("homepage", {
      title: "Justice home",
      accordions: accordions_list,
      user: getUser(),
    });
  } catch (err) {
    res.render("error", { error: err });
  }
});

router.get("/accordion/:id", verificaAcesso, async function (req, res, next) {
  try {
    const accordion = await accordions.getAccordion(req.params.id);
    res.render("accordion", {
      title: "Accordion " + accordion.id + " details",
      accordion: accordion,
      user: getUser(),
    });
  } catch (err) {
    res.render("error", { error: err });
  }
});

router.get(
  "/accordion/delete/:id",
  verificaAdminAcesso,
  async function (req, res, next) {
    try {
      await accordions.deleteAccordion(req.params.id);
      res.redirect("/");
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

router.get(
  "/removeFavourite/:id",
  verificaAcesso,
  async function (req, res, next) {
    const username = getJwtPayload(req.cookies.token).username;

    try {
      await removeFavorite(username, req.params.id);
      res.redirect("/user");
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

router.get(
  "/addFavourite/:id",
  verificaAcesso,
  async function (req, res, next) {
    const username = getJwtPayload(req.cookies.token).username;

    try {
      await addFavorite(username, req.params.id);
      res.redirect("/user");
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

module.exports = router;
