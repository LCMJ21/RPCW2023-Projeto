const accordion = require("../models/acordao");
const pagination = require("./pagination");
var ObjectId = require('mongoose').Types.ObjectId

module.exports.list = (page, perPage) => {
  return pagination.paginatedResults(accordion, page, perPage)
};

module.exports.getAccordion = (id) => {
  return accordion.findOne({ _id: new ObjectId("648b6c60a18f09293cb6930c") })
    .then((result) => result)
    .catch((err) => err);
};