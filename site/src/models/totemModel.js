var database = require("../database/config");

function cadastrar(nome, jar, chave, idEmpresa) {
    var createTotem = `INSERT INTO totem (nome, jar, chaveDeAcesso, fkEmpresa, totemstatus) VALUES ('${nome}', '${jar}', '${chave}', ${idEmpresa}, "inativo")`;
    return database.executar(createTotem);
}

function excluir(nome, idEmpresa) {
    var deleteCapturas = `DELETE FROM captura WHERE fkTotem = ${idEmpresa}`;
    var deleteComponente = `DELETE FROM componente WHERE fkTotem = ${idEmpresa}`;
    var deleteInfMaquina = `DELETE FROM infomaquina WHERE fkTotem = ${idEmpresa}`;
    var deleteTotem = `DELETE FROM totem WHERE nome = '${nome}' AND fkEmpresa = ${idEmpresa}`;

    return Promise.all([
        database.executar(deleteCapturas),
        database.executar(deleteComponente),
        database.executar(deleteInfMaquina),
        database.executar(deleteTotem)
    ]);
}

function listar(idEmpresa) {
    var getTotens = `SELECT * FROM totem WHERE fkEmpresa = '${idEmpresa}';`;
    return database.executar(getTotens);
}

function listarPorStatus(idEmpresa, status) {
    var getTotens = `SELECT * FROM totem WHERE fkEmpresa = '${idEmpresa}' AND totemstatus = '${status}';`;
    console.log(getTotens)
    return database.executar(getTotens);
}

module.exports = { 
    cadastrar,
    excluir,
    listar,
    listarPorStatus
 };