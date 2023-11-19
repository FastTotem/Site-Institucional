var database = require("../database/config")

function getEmpresaParams(idEmpresa) {
    var instrucao = `
        SELECT * FROM parametroAlerta WHERE fkEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucao);
}

function updateParamLevel(idParametro, ideal, alerta, critico, notificacao) {
    var dtAtual = process.env.AMBIENTE_PROCESSO === "desenvolvimento" ? "now()" : "GETDATE()";
    var instrucao = `
        UPDATE parametroAlerta SET ideal = ${ideal}, alerta = ${alerta}, critico = ${critico}, notificacao = ${notificacao}, dtCriacao = ${dtAtual} WHERE idParametroAlerta = ${idParametro};
    `;
    return database.executar(instrucao);
}

function insertDefaultValues(idEmpresa) {
    var dtAtual = process.env.AMBIENTE_PROCESSO === "desenvolvimento" ? "now()" : "GETDATE()";
    var instrucao = `
        INSERT INTO parametroAlerta (dtCriacao, componente, fkEmpresa, ideal, alerta, critico, notificacao) VALUES
        (${dtAtual}, 'MEMORIA', '${idEmpresa}', 60, 70, 80, 75),
        (${dtAtual}, 'PROCESSADOR', '${idEmpresa}', 70, 80, 90, 85),
        (${dtAtual}, 'DISCO', '${idEmpresa}', 60, 70, 80, 75),
        (${dtAtual}, 'USB', '${idEmpresa}', null, null, 40, 50);
    `;
    return database.executar(instrucao);
}

module.exports = {
    getEmpresaParams,
    updateParamLevel,
    insertDefaultValues
}