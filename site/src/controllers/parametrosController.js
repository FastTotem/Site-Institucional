var parametrosModel = require('../models/parametrosModel');

function getChartsData(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("O id da empresa é undefined!");
    } else {
        parametrosModel.getEmpresaParams(idEmpresa)
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

function updateParamLevel(req, res) {
    var idParametro = req.params.idParam;

    const { ideal, alerta, critico, notificacao } = req.body;

    const allValuesIsValid = [idParametro, ideal, alerta, critico, notificacao].every(item => item !== undefined);

    if (!allValuesIsValid) {
        res.status(400).send("O id da empresa é undefined!");
    } else {
        parametrosModel.updateParamLevel(idParametro, ideal, alerta, critico, notificacao)
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
    updateParamLevel
}