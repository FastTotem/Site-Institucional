var totemModel = require("../models/totemModel");

function cadastrar(req, res){

    var nome = req.body.nomeServer;
    var jar = req.body.jarServer;
    var chave = req.body.chaveServer;
    var idEmpresa = req.body.fkEmpresaServer;

    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (jar == undefined) {
        res.status(400).send("Jar está undefined!");
    } else if (chave == undefined) {
        res.status(400).send("Chave está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("IdEmpresa está undefined!");
    } else {

        totemModel.cadastrar(nome, jar, chave, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do totem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluir(req, res){

    var nome = req.body.nomeServer;
    var idEmpresa = req.body.fkEmpresaServer;

    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("IdEmpresa está undefined!");
    } else {

        totemModel.excluir(nome, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do totem! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listar(req, res){

    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa === undefined) {
        res.status(400).send("O Id da Empresa está undefined!");
    } else {

        totemModel.listar(idEmpresa)
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

    
    function listarPorStatus(req, res){

        var idEmpresa = req.params.idEmpresa;
        var status = req.params.status;
    
        if (idEmpresa === undefined) {
            res.status(400).send("O Id da Empresa está undefined!");
        } else {
    
            totemModel.listarPorStatus(idEmpresa, status)
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

function getTotemInfo(req, res) {
    var idTotem = req.params.idTotem;
    
    if (idTotem === undefined) {
        res.status(400).send("O id do totem está undefined!");
    } else {
        totemModel.getTotemInfo(idTotem)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao listar as informações totens! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function getDisks(req, res) {
    var idTotem = req.params.idTotem;
    
    if (idTotem === undefined) {
        res.status(400).send("O id do totem está undefined!");
    } else {
        totemModel.getDisks(idTotem)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao listar os discos dos totens! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = { 
    cadastrar,
    excluir,
    listar,
    listarPorStatus,
    getTotemInfo,
    getDisks
}