const mongoose = require('mongoose');

const descriptorSchema = new mongoose.Schema({
    nome: String,
});

const myDB = mongoose.connection.useDb('JusticeDB');
module.exports = myDB.model('descriptor', descriptorSchema);
