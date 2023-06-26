const accordion = require("../models/acordao");
const pagination = require("./pagination");

module.exports.list = (page, perPage) => {
  return pagination.paginatedResults(accordion, page, perPage);
};

module.exports.getUserAccordions = (page, perPage, accordions_ids) => {
  return pagination.paginatedResults(accordion, page, perPage, { Processo: { $in: accordions_ids } });
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
