const accordion = require("../models/acordao");
const pagination = require("./pagination");

module.exports.list = (page, perPage) => {
  return pagination.paginatedResults(accordion, page, perPage)
};

module.exports.getAccordion = (id) => {
  return accordion
    .findOne({ id })
    .then((data) => data)
    .catch((err) => err);
};