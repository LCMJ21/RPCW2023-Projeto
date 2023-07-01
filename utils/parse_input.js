const { $where } = require("../models/acordao");

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

module.exports.handleQuerry = (req, res, next) => {
  var querry = "";
  if (req.body) {
    for (var key in req.body) {
      var value = req.body[key];
      if (value && value !== "") {
        if (key === "Descritores") {
          if (typeof value === "string") {
            value = [value];
          }
          querry += "Descritores=" + value.join(",") + "&";
        }
        else if (key === "processoinputs") {
          querry += "Processo=" + value + "&";
        }
        else if (key === "datainputs") {
          querry += "Data=" + value + "&";
        }
        else if (key === "tribunalinputs") {
          querry += "tribunal=" + value + "&";
        }
        else if (key === "entidadesinputs") {
          if (typeof value === "string") {
            value = [value];
          }
          querry += "entidades=" + value.join(",") + "&";
        }      
      }
      req.url_querry = querry[querry.length - 1] === "&" ? querry.slice(0, -1) : querry;
    }
  }
  next();
  return;
}

module.exports.createFilter = (req, res, next) => {
  var filter = {};
  var oldquerry = {};
  var oldurl = ""
  const entidades = require("../models/acordao").fieldsDict["entidades"];
  oldquerry.page = Number(req.query.page || "1");

  if (req.query.Processo && req.query.Processo !== "") {
    filter["Processo"] = { $eq: req.query.Processo }
    oldquerry.Processo = req.query.Processo;
    oldurl += "Processo=" + req.query.Processo + "&";
  }
  if (req.query.Data && req.query.Data !== "") {
    var datel = req.query.Data.split("-");
    var date = datel[1] + "/" + datel[2] + "/" + datel[0];
    filter["Data do Acordão"] = { $eq: date };
    oldquerry.Data = req.query.Data;
    oldurl += "Data=" + req.query.Data + "&";
  }
  if (req.query.tribunal && req.query.tribunal !== "") {
    filter["tribunal"] = { $eq: req.query.tribunal };
    oldquerry.tribunal = req.query.tribunal;
    oldurl += "tribunal=" + req.query.tribunal + "&";
  }
  if (req.query.Descritores && req.query.Descritores !== "") {
    oldurl += "Descritores=" + req.query.Descritores + "&";
    if (typeof req.query.Descritores === "string") {
      req.query.Descritores = [req.query.Descritores];
    }
    var descritores = req.query.Descritores.split(",");
    filter["Descritores"] = { $in: descritores };
    oldquerry.Descritores = descritores;
  }
  if (req.query.entidades && req.query.entidades !== "") {
    oldurl += "entidades=" + req.query.entidades + "&";
    req.query.entidades = req.query.entidades.split(",");
    oldquerry.entidades = req.query.entidades;
    filter["$or"] = [];
    for (ent of entidades){
      filter["$or"].push({ [ent]: { $in: req.query.entidades } });
    }
  }
  req.filter = filter;
  req.oldquerry = oldquerry;
  req.oldurl = oldurl[oldurl.length - 1] === "&" ? oldurl.slice(0, -1) : oldurl;
  next();
  return;
}
