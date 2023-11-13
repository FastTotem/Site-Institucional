var capturaModel = require('../models/capturaModel.js');

function getChartsData(req, res) {
    var id = req.params.idTotem;

    if (id == undefined) {
        res.status(400).send("O id do totem é undefined!");
    } else {
        capturaModel.getChartsData(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function getKPIsData(req, res) {
    var id = req.params.idTotem;

    if (id == undefined) {
        res.status(400).send("O id do totem é undefined!");
    } else {
        capturaModel.getKPIsData(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    getChartsData,
    getKPIsData
}