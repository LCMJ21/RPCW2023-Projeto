var express = require("express");
var router = express.Router();
const fieldsDict = require("../models/acordao").fieldsDict;
var accordions = require("../controllers/accordion");
const { parse_new_acordao_input } = require("../utils/parse_input");
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

router.get("/", verificaAcesso, async function (req, res, next) {
  try {
    const user = await getUserInfo(getJwtPayload(req).username);
    const page = Number(req.query.page || "1");
    const perPage = 20;
    const accordions_list = await accordions.list(page, perPage);
    res.cookie("previousUrl", "/?page=" + page).render("homepage", {
      title: "Justice homepage",
      accordions: accordions_list,
      user,
    });
  } catch (err) {
    res.render("error", { error: err });
  }
});

router.post(
  "/accordion/new",
  verificaAcesso,
  parse_new_acordao_input,
  async function (req, res, next) {
    try {
      if (req.error) {
        const user = await getUserInfo(getJwtPayload(req).username);
        res.render("newAccordion", {
          title: "Novo Acordão",
          fieldsDict: fieldsDict,
          error_acordao: req.body,
          error: req.error_msg,
          user,
        });
      } else {
        res.redirect("/accordion/new");
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
  "/accordion/edit/:processo",
  verificaAcesso,
  parse_new_acordao_input,
  async function (req, res, next) {
    try {
      const processo = req.params.processo;
      if (req.error) {
        const user = await getUserInfo(getJwtPayload(req).username);
        res.render("editAccordion", {
          title: "Editar Acordão" + processo,
          fieldsDict: fieldsDict,
          processo: processo,
          error_acordao: req.body,
          error: req.error_msg,
          user,
        });
      } else {
        res.redirect("/accordion/edit/" + processo);
      }
    } catch (err) {
      res.render("error", { error: err });
    }
  }
);

router.get("/accordion/edit/:processo", verificaAcesso, async function (req, res, next) {
  const user = await getUserInfo(getJwtPayload(req).username);
  const processo = req.params.processo;
  const accordion = await accordions.getAccordion(processo);
  res.render("editAccordion", {
    title: "Editar Acordão " + processo,
    processo: processo,
    fieldsDict: fieldsDict,
    oldAccordion: accordion,
    user,
  });
});

router.get(
  "/accordion/:processo",
  verificaAcesso,
  async function (req, res, next) {
    try {
      const user = await getUserInfo(getJwtPayload(req).username);
      const processo = req.params.processo;
      const accordion = await accordions.getAccordion(processo);
      console.log(accordion);
      if (!accordion) {
        res
          .status(404)
          .render("error", { error: "Accordion" + processo + "not found" });
        return;
      }
      res
        .cookie("previousUrl", "/accordion/" + req.params.processo)
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
  "/accordion/delete/:processo",
  verificaAdminAcesso,
  async function (req, res, next) {
    try {
      const user = await getUserInfo(getJwtPayload(req).username);

      await accordions.deleteAccordion(req.params.processo);
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
