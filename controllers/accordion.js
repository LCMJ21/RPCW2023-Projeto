const accordion = require('../models/acordao');
const pagination = require('./pagination');
const descriptor = require('../models/descritor');

module.exports.list = (page, perPage, filter) => {
    return pagination.paginatedResults(accordion, page, perPage, filter);
};

module.exports.getUserAccordions = (page, perPage, ids) => {
    return pagination.paginatedResultsWhitIds(
        accordion,
        page,
        perPage,
        '_id',
        ids
    );
};

module.exports.getAccordion = (id) => {
    return accordion
        .findOne({ _id: id })
        .then((result) => result)
        .catch((err) => err);
};

module.exports.deleteAccordion = (id) => {
    return accordion
        .findOneAndDelete({ _id: id })
        .then((result) => result)
        .catch((err) => err);
};

module.exports.createAccordion = async (acordao) => {
    return await accordion
        .create(acordao)
        .then(async (result) => {
            await acordao.Descritores.forEach(async (desc) => {
                await descriptor.updateOne(
                    { nome: desc },
                    { nome: desc },
                    { upsert: true }
                );
            });

            return result;
        })
        .catch((err) => err);
};

module.exports.updateAccordion = async (id, acordao) => {
    try {
        await accordion.validate(acordao);

        return await accordion
            .replaceOne({ _id: id }, acordao)
            .then(async (result) => {
                await acordao.Descritores.forEach(async (desc) => {
                    await descriptor.updateOne(
                        { nome: desc },
                        { nome: desc },
                        { upsert: true }
                    );
                });

                return result;
            })
            .catch((err) => err);
    } catch (err) {
        return err;
    }
};
