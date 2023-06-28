module.exports.parse_new_acordao_input = (req, res, next) => {
  const entries = Object.entries(req.body);
  var acordao = {};
  var new_key;
  for (const [key, value] of entries) {
    if (key === "labels") {
      acordao["Descritores"] = value;
    } else {
      const key_list = key.split(".");
      if (key_list[1] === "key") {
        new_key = value;
        if (new_key in acordao) {
          req.error = true;
          req.error_msg =
            "O atributo " + new_key + " está definido mais do que uma vez!";
          next();
          return;
        }
      } else {
        if (!value) {
          req.error = true;
          req.error_msg = "O atributo " + new_key + " está vazio!";
          next();
          return;
        }
        acordao[new_key] = value;
      }
    }
  }

  needed_keys = ["A"];
  
  for (var key of needed_keys) {
    if (!(key in acordao)) {
      req.error = true;
      req.error_msg = "O atributo " + key + " é obrigatório!";
      next();
      return;
    }
  }

  if (!("Descritores" in acordao)) {
    req.error = true;
    req.error_msg = "O acordão tem de ter pelo menos uma Label!";
    next();
    return;
  }

  req.acordao = acordao;
  req.error = false;
  next();
};
