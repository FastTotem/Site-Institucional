var database = require("../database/config");

function cadastrar(nome, jar, chave, idEmpresa) {
    var createTotem = `INSERT INTO totem (nome, jar, chaveDeAcesso, fkEmpresa, statusTotem) VALUES ('${nome}', '${jar}', '${chave}', ${idEmpresa}, "inativo")`;
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
    var getTotens = `SELECT * FROM totem WHERE fkEmpresa = '${idEmpresa}' AND statusTotem = '${status}';`;
    return database.executar(getTotens);
}

function listarStatus(idEmpresa) {
    var getTotens = `
    SELECT statusTotem, COUNT(*) AS quantidade
    FROM totem
    WHERE fkEmpresa = ${idEmpresa}
    GROUP BY statusTotem;
        `;
    return database.executar(getTotens);
}

function listarPorNome(idEmpresa, nome) {
    var getTotens = `SELECT * FROM totem WHERE fkEmpresa = '${idEmpresa}' AND nome = '${nome}';`;
    return database.executar(getTotens);
}

function getTotemInfo(idTotem) {
    let previousTotemId = Number(idTotem) - 1;
    let nextTotemId = Number(idTotem) + 1;

    var instrucao = `
        SELECT totem.nome, totem.chaveDeAcesso,
        infoMaquina.nomeProcessador,
        infoMaquina.sistemaOperacional,
        infoMaquina.capacidadeRam,
        infoMaquina.capacidadeDisco,
        EXISTS(SELECT * FROM totem WHERE idTotem = '${previousTotemId}') as totemAnteriorExiste,
        EXISTS(SELECT * FROM totem WHERE idTotem = '${nextTotemId}') as proximoTotemExiste
        FROM totem JOIN infoMaquina
        ON idTotem = fkTotem
        WHERE idTotem = '${idTotem}';
    `;
    
    return database.executar(instrucao);
}

function getDisks(idTotem) {
    var instrucao = `
        SELECT nomeComponente, tipoComponente FROM componente JOIN totem 
        ON idTotem = fkTotem WHERE idTotem = ${idTotem} AND tipoComponente = "DISCO";
    `;

    return database.executar(instrucao);
}

module.exports = { 
    cadastrar,
    excluir,
    listar,
    listarPorStatus,
    listarPorNome,
    listarStatus,
    getTotemInfo,
    getDisks,
    listarPorNome
 };