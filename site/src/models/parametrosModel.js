var database = require("../database/config")

function getEmpresaParams(idEmpresa) {
    var instrucao = `
        SELECT * FROM parametroAlerta WHERE fkEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucao);
}

function updateParamLevel(idParametro, ideal, alerta, critico, notificacao) {
    var instrucao = `
        UPDATE parametroAlerta SET ideal = ${ideal}, alerta = ${alerta}, critico = ${critico}, notificacao = ${notificacao} WHERE idParametroAlerta = ${idParametro};
    `;
    return database.executar(instrucao);
}

module.exports = {
    getEmpresaParams,
    updateParamLevel
}