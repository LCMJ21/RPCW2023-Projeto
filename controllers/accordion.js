const accordion = require("../models/acordao");
const pagination = require("./pagination");

module.exports.list = (page, perPage, filter) => {
  return pagination.paginatedResults(accordion, page, perPage, filter);
};

module.exports.getUserAccordions = (page, perPage, ids) => {
  
  return pagination.paginatedResultsWhitIds(accordion, page, perPage, "_id", ids);
};

module.exports.getAccordion = (id) => {
  return accordion.findOne({ _id: id })
    .then((result) => result)
    .catch((err) => err);
};

module.exports.deleteAccordion = (id) => {
  return accordion.findOneAndDelete({ _id: id })
    .then((result) => result)
    .catch((err) => err);
}

module.exports.createAccordion = (acordao) => {
  return accordion.create(acordao)
    .then((result) => result)
    .catch((err) => err);
}

module.exports.updateAccordion = async (id, acordao) => {
  try {
    await accordion.validate(acordao);
    return accordion.replaceOne({ _id: id }, acordao)
    .then((result) => result)
    .catch((err) => err);
  }
  catch (err) {
    return err;
  }
}
