module.exports.parse_new_acordao_input = (req, res, next) => {
  const arraysElements = require("../models/acordao").arraysElements;
  const entries = Object.entries(req.body);
  var acordao = {};
  var new_key;
  for (const [key, value] of entries) {
    if (key === "labels") {
      if ((typeof value) === "string") {
        acordao["Descritores"] = [value];
        req.body[key] = [value];
      }
      else {
        acordao["Descritores"] = value;
      }
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
        if(!new_key){
          req.error = true;
          req.error_msg = "Existem atributos que não foram selecionados!";
          next();
          return;
        }
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

module.exports.add_accordion = async (req, res, next) => {
  if (req.error) {
    next();
    return;
  }
  try {
    var accordions = require("../controllers/accordion");
    const result = await accordions.createAccordion(req.acordao);
    if (result.errors || result.code === 11000) {
      if (result.code === 11000) {
        req.error_msg = "O Processo " + result.keyValue.Processo + " já existe!";
      } else {
        req.error_msg = "";
        for (var key in result.errors) {
          var error = result.errors[key].properties;
          req.error_msg += "O atributo " + error.path + " tem que ser preenchido!\n";
        } 
      }
      req.error = true;
      next();
      return;
    }
    req.error = false;
    req.acordao = result;
    next();
    return;
  } catch (err) {
    req.error = true;
    req.error_msg = err;
    next();
    return;
  }
}

module.exports.edit_accordion = async (req, res, next) => {
  if (req.error) {
    next();
    return;
  }
  try {
    var accordions = require("../controllers/accordion");
    const result = await accordions.updateAccordion(req.acordao.Processo, req.acordao);
    console.log(result);
    if (result.errors || result.code === 11000) {
      if (result.code === 11000) {
        req.error_msg = "O Processo " + result.keyValue.Processo + " já existe!";
      } else {
        req.error_msg = "";
        for (var key in result.errors) {
          var error = result.errors[key].properties;
          req.error_msg += "O atributo " + error.path + " tem que ser preenchido!\n";
        } 
      }
      req.error = true;
      next();
      return;
    }
    req.error = false;
    req.acordao = result;
    next();
    return;
  } catch (err) {
    req.error = true;
    req.error_msg = err;
    next();
    return;
  }
}
