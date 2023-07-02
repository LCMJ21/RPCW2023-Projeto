const descritor = require('../models/descritor');

module.exports.getDescriptors = async () => {
    const descs = await descritor.find().sort({ nome: 1 });

    return descs.map((desc) => desc.nome);
};
