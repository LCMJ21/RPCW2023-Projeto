module.exports.parse_new_acordao_input = (req, res, next) => {
  const arraysElements = require("../models/acordao").arraysElements;
  const entries = Object.entries(req.body);
  console.log(entries);
  var acordao = {};
  var new_key;
  for (const [key, value] of entries) {
    if (key === "labels") {
      acordao["Descritores"] = value;
    }
    else if (key === "Mais Informação") {
      if (value) {
        acordao["Mais Informação"] = value;
      }
    }
    else {
      const key_list = key.split(".");
      if (key_list[1] === "key") {
        new_key = value;
        if (new_key in acordao && !arraysElements.includes(new_key)) {
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
        if (arraysElements.includes(new_key)) {
          if (!(new_key in acordao)) {
            acordao[new_key] = [];
          }
          acordao[new_key].push(value);
        }
        else{
          acordao[new_key] = value;
        }
      }
    }
  }

  needed_keys = [];
  
  for (var key of needed_keys) {
    if (!(key in acordao)) {
      req.error = true;
      req.error_msg = "O atributo " + key + " é obrigatório!";
      next();
      return;
    }
  }
  console.log(acordao);

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
