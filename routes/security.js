exports.verificaAcesso = (req, res, next) => {
  var myToken = req.query.token || req.body.token;
  if (myToken) {
    jwt.verify(myToken, "rpcw2023", function (e, payload) {
      if (e) {
        res.status(401).jsonp({ error: e });
      } else {
        next();
      }
    });
  } else {
    res.redirect("/users/login");
  }
};
