var database = require("../database/config");

function cadastrar(nome, jar, chave, idEmpresa) {
    var dtAtual = process.env.AMBIENTE_PROCESSO === "desenvolvimento" ? "now()" : "GETDATE()";
    var createTotem = `INSERT INTO totem (nome, jar, chaveDeAcesso, fkEmpresa, statusTotem, dtCriacao) VALUES ('${nome}', '${jar}', '${chave}', ${idEmpresa}, 'inativo', ${dtAtual})`;
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
    var instrucao = `
        SELECT totemAtual.idTotem, totemAtual.nome, totemAtual.chaveDeAcesso,
        infoMaquina.nomeProcessador,
        infoMaquina.sistemaOperacional,
        infoMaquina.capacidadeRam,
        infoMaquina.capacidadeDisco,
        (SELECT MAX(idTotem) FROM totem WHERE fkEmpresa = totemAtual.fkEmpresa AND totem.idTotem < totemAtual.idTotem) as idTotemAnterior,
        (SELECT MIN(idTotem) FROM totem WHERE fkEmpresa = totemAtual.fkEmpresa AND totem.idTotem > totemAtual.idTotem) as idProximoTotem
        FROM totem as totemAtual LEFT JOIN infoMaquina
        ON totemAtual.idTotem = infoMaquina.fkTotem
        WHERE totemAtual.idTotem = ${idTotem};
    `;
    
    return database.executar(instrucao);
}

function getDisks(idTotem) {
    var instrucao = `
        SELECT nomeComponente, tipoComponente FROM componente JOIN totem 
        ON idTotem = fkTotem WHERE idTotem = ${idTotem} AND tipoComponente = 'DISCO';
    `;

    return database.executar(instrucao);
}

function getFirstTotem(idEmpresa) {
    var instrucao = `
        SELECT MIN(idTotem) as fisrtTotemID FROM totem WHERE fkEmpresa = ${idEmpresa};
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
    listarPorNome,
    getFirstTotem
 };