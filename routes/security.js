var jwt = require("jsonwebtoken");
const { Level } = require("../utils/enums");

exports.verificaAcesso = (req, res, next) => {
  var myToken = req.cookies["token"];

  if (myToken) {
    jwt.verify(myToken, "justiceApp", function (e, payload) {
      if (e) {
        res.clearCookie("token").redirect("/users/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/users/login");
  }
};

exports.verificaAdminAcesso = (req, res, next) => {
  var myToken = req.cookies["token"];

  if (myToken) {
    const payload = jwt.decode(myToken)
      if (!payload) {
        res.clearCookie("token").redirect("/users/login");
      } else if (payload.level === Level.Admin) {
        next();
      } else {
        res.render("error", { message: "Acesso negado! Apenas Adminnistradores podem efetuar esta ação.", error: { status: "403", stack: "" } });
      }
  } else {
    res.redirect("/users/login");
  }
};

exports.getJwtPayload = (req) => jwt.decode(req.cookies["token"]);
