var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT idUsuario, nome, email, nivelAcesso, fkEmpresa FROM usuario WHERE email = '${email}' AND senha = '${senha}';`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function checarSenha(id, senha) {
    var instrucao = `SELECT * FROM Usuario WHERE idUsuario = '${id}' AND senha = '${senha}';`;
    return database.executar(instrucao);
}

function getUser(id) {
    var instrucao = `SELECT * FROM Usuario WHERE idUsuario = '${id}';`;
    return database.executar(instrucao);
}

function updateSenha(id, senha) {
    var instrucao = `UPDATE Usuario SET senha='${senha}' WHERE idUsuario = '${id}';`;
    return database.executar(instrucao);
}

function updateNome(id, nome) {
    var instrucao = `UPDATE Usuario SET nome='${nome}' WHERE idUsuario = '${id}';`;
    return database.executar(instrucao);
}

function cadastrar(nome, email, senha, empresaId, nivelDeAcesso) {
    var usuarioQuery = `INSERT INTO Usuario (nome, email, senha, nivelAcesso, fkEmpresa) VALUES ('${nome}Admin', '${email}', '${senha}', '${nivelDeAcesso}', ${empresaId})`;

    return database.executar(usuarioQuery);
}

module.exports = {
    autenticar,
    cadastrar,
    checarSenha,
    updateNome,
    updateSenha,
    getUser
};