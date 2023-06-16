const accordion = require("../models/acordao");
const pagination = require("./pagination");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports.list = (page, perPage) => {
  return pagination.paginatedResults(accordion, page, perPage);
};

module.exports.getAccordion = (id) => {
  return accordion
    .findOne({ _id: id })
    .then((result) => result)
    .catch((err) => err);
};
