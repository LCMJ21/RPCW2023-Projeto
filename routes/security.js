var jwt = require("jsonwebtoken");

exports.verificaAcesso = (req, res, next) => {
  var myToken = req.query.token || req.body.token;
  if (myToken) {
    jwt.verify(myToken, "justiceApp", function (e, payload) {
      if (e) {
        res.status(401).jsonp({ error: e });
      } else {
        next();
      }
    });
  } else {
    res.redirect("/user/login");
  }
};
