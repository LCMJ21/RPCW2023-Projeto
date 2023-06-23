var express = require("express");
var router = express.Router();
var accordions = require("../controllers/accordion");
const { parse_new_acordao_input } = require("../utils/parse_input")
const {
  verificaAcesso,
  verificaAdminAcesso,
  getJwtPayload,
} = require("./security");
const {
  removeFavorite,
  addFavorite,
  getUserInfo,
} = require("../controllers/user");

const input_group = {
  main : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  geral : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  entidades: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  datas: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  outros: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
}

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
  const user = await getUserInfo(getJwtPayload(req).username);
  try {
    const page = Number(req.query.page || "1");
    const perPage = 20;
    const accordions_list = await accordions.list(page, perPage);
    res.render("homepage", {
      title: "Justice home",
      accordions: accordions_list,
      user,
    });
  } catch (err) {
    res.render("error", { error: err });
  }
});

router.post("/accordion/new", verificaAcesso, parse_new_acordao_input, function (req, res, next) {
  if (req.error) {
    res.render("newAccordion", { title: "Add new accordion", input_group, error_acordao: req.body, error: req.error_msg, user: getUser() });
  }
  else{
    console.log(req.acordao)
    res.redirect("/accordion/new");
  }
});


router.get("/accordion/new", verificaAcesso, function (req, res, next) {
  res.render("newAccordion", { title: "Add new accordion", input_group, user: getUser() });
});

router.get("/accordion/:processo", verificaAcesso, async function (req, res, next) {
  try {
    const processo = req.params.processo;
    const accordion = await accordions.getAccordion(processo);
    if (!accordion) {
      res.status(404).render("error", { error: "Accordion" + processo + "not found" });
      return;
    }
    res.render("accordion", {
      title: "Accordion " + accordion.processo + " details",
      accordion: accordion,
      user: getUser(),
    });
  } catch (err) {
    res.render("error", { error: err });
  }
});

router.get("/accordion/delete/:processo", verificaAdminAcesso, async function (req, res, next) {
  try {
    await accordions.deleteAccordion(req.params.processo);
    res.redirect("/");
  } catch (err) {
    res.render("error", { error: err });
  }
});

router.get(
  "/removeFavourite/:id",
  verificaAcesso,
  async function (req, res, next) {
    const username = getJwtPayload(req).username;

    try {
      await removeFavorite(username, req.params.id);
      res.redirect("/");
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

router.get(
  "/addFavourite/:id",
  verificaAcesso,
  async function (req, res, next) {
    const username = getJwtPayload(req).username;

    try {
      await addFavorite(username, req.params.id);
      res.redirect("/");
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

module.exports = router;
