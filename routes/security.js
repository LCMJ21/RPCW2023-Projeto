var jwt = require("jsonwebtoken");

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

exports.getJwtPayload = (req) => jwt.decode(req.cookies["token"]);
