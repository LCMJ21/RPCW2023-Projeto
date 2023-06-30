module.exports.paginatedResults = async (model, page, perPage, filter=undefined) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    var totalElems;
    if (filter) {
      totalElems = await model.count(filter).exec();
    }
    else {
      totalElems = await model.estimatedDocumentCount().exec();
    }
    const totalPages = Math.ceil(totalElems / perPage);

    const results = {};
    results.currentPage = page;
    results.totalElems = totalElems;
    results.currentElems = endIndex;
    results.totalPages = totalPages;

    if (page > 1) {
      var previousPages = [];
      for (var i = page-2; i < page; i++) {
        if (i > 0) {
          previousPages.push(i);
        }
      }
      results.previousPages = previousPages
    }

    if (page < totalPages) {
      var nextPages = [];
      for (var i = page+1; i <= totalPages && i <= page+2; i++) {
        nextPages.push(i);
      }
      results.nextPages = nextPages
    }
    else {
      results.currentElems = totalElems;
    }

    try {
      if (filter) {
        results.results = await model.find(filter).limit(perPage).skip(startIndex).exec();
        return results;
      }
      else {
        results.results = await model.find().limit(perPage).skip(startIndex).exec();
        return results;
      }
    } catch (e) {
      return { message: e.message };
    }
  };

  module.exports.paginatedResultsWhitIds = async (model, page, perPage, key, values) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    var totalElems = values.length;
    const totalPages = Math.ceil(totalElems / perPage);
    const results = {};
    results.currentPage = page;
    results.totalElems = totalElems;
    results.currentElems = endIndex;
    results.totalPages = totalPages;

    if (page > 1) {
      var previousPages = [];
      for (var i = page-2; i < page; i++) {
        if (i > 0) {
          previousPages.push(i);
        }
      }
      results.previousPages = previousPages
    }

    if (page < totalPages) {
      var nextPages = [];
      for (var i = page+1; i <= totalPages && i <= page+2; i++) {
        nextPages.push(i);
      }
      results.nextPages = nextPages
    }
    else {
      results.currentElems = totalElems;
    }

    try {
      results.results = await model.find({ [key]: { $in: values } }).limit(perPage).skip(startIndex).exec();
      return results;
    } catch (e) {
      return { message: e.message };
    }
  };