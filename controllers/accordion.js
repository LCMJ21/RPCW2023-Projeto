const accordion = require("../models/acordao");
const pagination = require("./pagination");

module.exports.list = (page, perPage) => {
  return pagination.paginatedResults(accordion, page, perPage);
};

module.exports.getAccordion = (id) => {
  return accordion.findById(id)
    .then((result) => result)
    .catch((err) => err);
};

module.exports.deleteAccordion = (id) => {
  return accordion.findByIdAndDelete(id)
    .then((result) => result)
    .catch((err) => err);
}
