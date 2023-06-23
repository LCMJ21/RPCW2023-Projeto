const accordion = require("../models/acordao");
const pagination = require("./pagination");

module.exports.list = (page, perPage) => {
  return pagination.paginatedResults(accordion, page, perPage);
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
