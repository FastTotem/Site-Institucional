var capturaModel = require("../models/capturaModel");

function listarOcorrenciasCriticas(req, res) {

    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa === undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else  {

        capturaModel.listarOcorrenciasCriticas(idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao listar os totens! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listarUptime(req, res) {

    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa === undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else  {

        capturaModel.listarUptime(idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao listar os totens! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listarCapturasComponentes(req, res) {

    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa === undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {

        capturaModel.listarCapturasComponentes(idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao listar os totens! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    listarOcorrenciasCriticas,
    listarUptime,
    listarCapturasComponentes
}