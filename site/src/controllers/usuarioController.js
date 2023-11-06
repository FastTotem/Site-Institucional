var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    res.json(resultadoAutenticar);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function getUser(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        usuarioModel.getUser(id)
            .then(
                function (resultadoAutenticar) {
                    res.json(resultadoAutenticar);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {

        usuarioModel.listar(idEmpresa)
            .then(
                function (resposta) {
                    res.json(resposta);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function listarPorStatus(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var status = req.params.status;

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    }else if (status == undefined) {
        res.status(400).send("Status está undefined!");
    } else {

        usuarioModel.listarPorStatus(idEmpresa, status)
            .then(
                function (resposta) {
                    res.json(resposta);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function verificarEmail(req, res) {
    var email = req.params.email;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        usuarioModel.verificarEmail(email)
            .then(
                function (resposta) {
                    res.json(resposta);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function checarSenha(req, res) {
    var senha = req.body.senhaServer;
    var id = req.body.idServer;

    if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.checarSenha(id, senha)
            .then(
                function (resultadoChecar) {
                    res.json(resultadoChecar);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {

    var nome = req.body.nomeServer; 
    var email = req.body.emailServer;
    var senha = req.body.senhaServer; 
    var nivelAcesso = req.body.nivelAcessoServer;
    var empresaId = req.body.fkEmpresaServer; 

    if (nome == undefined) {
        res.status(400).send("Nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Senha está undefined!");
    } else if (empresaId == undefined) {
        res.status(400).send("FkEmpresa está undefined!");
    }  else if (nivelAcesso == undefined) {
        res.status(400).send("Nivel de Acesso está undefined!");
    } else {

        usuarioModel.cadastrar(nome, email, senha, nivelAcesso , empresaId)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function inativar(req, res) {

    var email = req.body.emailServer;
    var empresaId = req.body.fkEmpresaServer; 

     if (email == undefined) {
        res.status(400).send("Email está undefined!");
    } else if (empresaId == undefined) {
        res.status(400).send("FkEmpresa está undefined!");
    } else {

        usuarioModel.inativar(email, empresaId)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function ativar(req, res) {

    var email = req.body.emailServer;
    var empresaId = req.body.fkEmpresaServer; 

     if (email == undefined) {
        res.status(400).send("Email está undefined!");
    } else if (empresaId == undefined) {
        res.status(400).send("FkEmpresa está undefined!");
    } else {

        usuarioModel.ativar(email, empresaId)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluir(req, res) {

    var email = req.body.emailServer;
    var empresaId = req.body.fkEmpresaServer; 

     if (email == undefined) {
        res.status(400).send("Email está undefined!");
    } else if (empresaId == undefined) {
        res.status(400).send("FkEmpresa está undefined!");
    } else {

        usuarioModel.excluir(email, empresaId)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function updateNome(req, res) {
    var nome = req.body.nomeServer;
    var id = req.params.id;

    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else {

        usuarioModel.updateNome(id, nome)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function updateSenha(req, res) {
    var senha = req.body.senhaServer;
    var id = req.params.id;

    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.updateSenha(id, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function changeProfileImage(req, res) {
    var imagePath = req.file?.filename;
    var id = req.params.id;
    console.log(id, imagePath);

    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (imagePath == undefined) {
        res.status(400).send("Sua imagem está undefined!");
    } else {

        usuarioModel.updateProfileImage(id, imagePath)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    checarSenha,
    updateNome,
    updateSenha,
    getUser,
    listar,
    ativar,
    inativar,
    excluir,
    changeProfileImage,
    listarPorStatus,
    verificarEmail
}