module.exports.paginatedResults = async (model, page, perPage) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const totalElems = await model.countDocuments().exec();
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
      results.results = await model.find().limit(perPage).skip(startIndex).exec();
      return results;
    } catch (e) {
      return { message: e.message };
    }
  };