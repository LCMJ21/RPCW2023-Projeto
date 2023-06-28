const mongoose = require('mongoose');

const accordionSchema = new mongoose.Schema({
    'Ano da Publicação': String,
    Contencioso: String,
    Data: String,
    'Data de Entrada': String,
    'Data do Acordão': String,
    Decisão: String,
    'Decisão Texto Integral': String,
    Descritores: Array,
    'Indicações Eventuais': String,
    'Jurisprudência Nacional': String,
    'Legislação Nacional': String,
    Magistrado: String,
    'Meio Processual': String,
    'Nº Convencional': String,
    'Nº Processo/TAF': String,
    'Nº do Documento': String,
    Objecto: String,
    Privacidade: String,
    Processo: String,
    Recorrente: String,
    Recorrido: Array,
    'Referência a Doutrina': String,
    Relator: String,
    Secção: String,
    Sumário: String,
    'Texto Integral': String,
    Tribunal: String,
    'Tribunal Recurso': String,
    Votação: String,
    tribunal: String,
    url: String,
    'Área Temática': Array,
    'Mais Informação': String,
});

const fieldsDict = {
    'main': [
        'Decisão',
        'Decisão Texto Integral',
        'Indicações Eventuais',
        'Jurisprudência Nacional',
        'Legislação Nacional',
        'Sumário',
        'Texto Integral',
        'Votação',
        'Referência a Doutrina',
    ],
    'geral': [
        'Processo',
        'Nº Convencional',
        'Nº Processo/TAF',
        'Nº do Documento',
        'Área Temática',
    ],
    'entidades': [
        'Contencioso',
        'Recorrente',
        'Recorrido',
        'Relator',
        'Magistrado',
        'Tribunal',
        'Tribunal Recurso',
        'Secção',
    ],
    'datas': [
        'Ano da Publicação',
        'Data',
        'Data de Entrada',
        'Data do Acordão'
    ],
    'outros': [
        'Meio Processual',
        'Privacidade',
        'Objecto',
        'tribunal',
    ],
};

const myDB = mongoose.connection.useDb('JusticeDB');
module.exports = myDB.model('accordion', accordionSchema);
module.exports.fieldsDict = fieldsDict;
