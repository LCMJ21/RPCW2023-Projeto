var express = require("express");
var router = express.Router();
const fieldsDict = require("../models/acordao").fieldsDict;
var accordions = require("../controllers/accordion");
const { parse_new_acordao_input, add_accordion, edit_accordion, handleQuerry, createFilter } = require("../utils/parse_input");
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

router.get("/", verificaAcesso, createFilter, async function (req, res, next) {
  try {
    const user = await getUserInfo(getJwtPayload(req).username);
    const perPage = 20;
    const accordions_list = await accordions.list(req.oldquerry.page, perPage, req.filter);
    res.cookie("previousUrl", "/?page=" + req.oldquerry.page + "&" + req.oldurl).render("homepage", {
      title: "Justice homepage",
      accordions: accordions_list,
      oldquerry: req.oldquerry,
      oldurl: req.oldurl,
      user,
    });
  } catch (err) {
    res.render("error", { error: err });
  }
});

router.post("/search", verificaAcesso, handleQuerry, async function (req, res, next) {
  try {
    const page = Number(req.query.page || "1");
    res.redirect("/?page=" + page + "&" + req.url_querry);
  } catch (err) {
    res.render("error", { error: err });
  }
});


router.post(
  "/accordion/new",
  verificaAcesso,
  parse_new_acordao_input,
  add_accordion,
  async function (req, res, next) {
    try {
      const user = await getUserInfo(getJwtPayload(req).username);
      if (req.error) {
        res.render("newAccordion", {
          title: "Novo Acordão",
          fieldsDict: fieldsDict,
          error_acordao: req.body,
          error: req.error_msg,
          user,
        });
      } else {
        res.redirect("/accordion/" + req.acordao.id);
      }
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

router.get("/accordion/new", verificaAcesso, async function (req, res, next) {
  const user = await getUserInfo(getJwtPayload(req).username);
  res.render("newAccordion", {
    title: "Novo Acordão",
    fieldsDict: fieldsDict,
    user,
  });
});

router.post(
  "/accordion/edit/:id",
  verificaAcesso,
  parse_new_acordao_input,
  edit_accordion,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      if (req.error) {
        const user = await getUserInfo(getJwtPayload(req).username);
        res.render("editAccordion", {
          title: "Editar Acordão" + req.body.Processo,
          process: req.body.Processo,
          id: id,
          fieldsDict: fieldsDict,
          error_acordao: req.body,
          error: req.error_msg,
          user,
        });
      } else {
        res.redirect("/accordion/" + id);
      }
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

router.get("/accordion/edit/:id", verificaAcesso, async function (req, res, next) {
  const user = await getUserInfo(getJwtPayload(req).username);
  const id = req.params.id;
  const accordion = await accordions.getAccordion(id);
  res.render("editAccordion", {
    title: "Editar Acordão " + accordion.Processo,
    id: id,
    process: accordion.Processo,
    fieldsDict: fieldsDict,
    oldAccordion: accordion,
    user,
  });
});

router.get(
  "/accordion/:id",
  verificaAcesso,
  async function (req, res, next) {
    try {
      const user = await getUserInfo(getJwtPayload(req).username);
      const id = req.params.id;
      const accordion = await accordions.getAccordion(id);
      if (!accordion) {
        res
          .status(404)
          .render("error", { error: "Accordion" + id + "not found" });
        return;
      }
      res
        .cookie("previousUrl", "/accordion/" + req.params.id)
        .render("accordion", {
          title: "Accordion " + accordion.Processo,
          fieldsDict: fieldsDict,
          accordion: accordion,
          user: user,
        });
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

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
    const username = getJwtPayload(req).username;

    try {
      await removeFavorite(username, req.params.id);
      res.redirect(req.cookies.previousUrl || "/");
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
      res.redirect(req.cookies.previousUrl || "/");
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

module.exports = router;
