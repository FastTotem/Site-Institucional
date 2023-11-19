var database = require("../database/config")

function getEmpresaParams(idEmpresa) {
    var instrucao = `
        SELECT * FROM parametroAlerta WHERE fkEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucao);
}

function updateParamLevel(idParametro, ideal, alerta, critico, notificacao) {
    var instrucao = `
        UPDATE parametroAlerta SET ideal = ${ideal}, alerta = ${alerta}, critico = ${critico}, notificacao = ${notificacao}, dtCriacao = now() WHERE idParametroAlerta = ${idParametro};
    `;
    return database.executar(instrucao);
}

function insertDefaultValues(idEmpresa) {
    var instrucao = `
        INSERT INTO parametroAlerta VALUES
        (null, now(), "MEMORIA", "${idEmpresa}", 60, 70, 80, 75),
        (null, now(), "PROCESSADOR", "${idEmpresa}", 70, 80, 90, 85),
        (null, now(), "DISCO", "${idEmpresa}", 60, 70, 80, 75),
        (null, now(), "USB", "${idEmpresa}", null, null, 40, 50);
    `;
    return database.executar(instrucao);
}

module.exports = {
    getEmpresaParams,
    updateParamLevel,
    insertDefaultValues
}