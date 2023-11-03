var dadosComponentesModel = require('../models/dadosComponentes.js');

function getChartsData(req, res) {
    var id = req.params.idTotem;

    if (id == undefined) {
        res.status(400).send("O id do totem é undefined!");
    } else {
        dadosComponentesModel.getChartsData(id)
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
    getChartsData
}