const accordion = require("../models/acordao");
const pagination = require("./pagination");

module.exports.list = (page, perPage) => {
  return pagination.paginatedResults(accordion, page, perPage);
};

module.exports.getUserAccordions = (page, perPage, accordions_ids) => {
  return pagination.paginatedResultsWhitIds(accordion, page, perPage, "Processo", accordions_ids);
};

module.exports.getAccordion = (processo) => {
  return accordion.findOne({ Processo: processo })
    .then((result) => result)
    .catch((err) => err);
};

module.exports.deleteAccordion = (processo) => {
  return accordion.findOneAndDelete({ Processo: processo })
    .then((result) => result)
    .catch((err) => err);
}

module.exports.createAccordion = (acordao) => {
  return accordion.create(acordao)
    .then((result) => result)
    .catch((err) => err);
}

module.exports.updateAccordion = async (processo, acordao) => {
  try {
    await accordion.validate(acordao);
    return accordion.replaceOne({ Processo: processo }, acordao)
    .then((result) => result)
    .catch((err) => err);
  }
  catch (err) {
    return err;
  }
}
