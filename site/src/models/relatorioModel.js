var database = require("../database/config");

function gerarCaptura(idEmpresa, dataInicial, dataFinal){

    var gerarRelatorioCaptura = `
    SELECT
    COUNT(idCaptura) AS totalCapturas,
    ROUND(AVG(valor), 2) AS mediaCapturasPorDia,
    tipo
FROM
    captura
WHERE
    fkTotem IN (SELECT idTotem FROM totem WHERE fkEmpresa = ${idEmpresa}) AND
    dataHora BETWEEN '${dataInicial}' AND '${dataFinal}'
GROUP BY
    tipo;
        `;
    return database.executar(gerarRelatorioCaptura);

}

function gerarTotens(idEmpresa, dataInicial, dataFinal){
    
    var gerarRelatorioTotens = `
    SELECT
    idTotem,
    nome,
    dtCriacao,
    statusTotem,
    jar
FROM
    totem
WHERE
    fkEmpresa = ${idEmpresa} AND
    dtCriacao BETWEEN '${dataInicial}' AND '${dataFinal}';
        `;
    return database.executar(gerarRelatorioTotens);

}

function gerarParametros(idEmpresa, dataInicial, dataFinal){

    var gerarRelatorioParametros = `
    SELECT
    idParametroAlerta,
    componente,
    dtCriacao,
    ideal,
    alerta,
    critico,
    notificacao
FROM
    parametroAlerta
WHERE
    fkEmpresa = ${idEmpresa} AND
    dtCriacao BETWEEN '${dataInicial}' AND '${dataFinal}';
        `;
    return database.executar(gerarRelatorioParametros);
    
}

function gerarFuncionarios(idEmpresa, dataInicial, dataFinal){
    
    var gerarRelatorioFuncionarios = `
    SELECT
    idUsuario,
    nome,
    statusUsuario,
    nivelAcesso,
    dtCriacao
FROM
    usuario
WHERE
    fkEmpresa = ${idEmpresa} AND
    dtCriacao BETWEEN '${dataInicial}' AND '${dataFinal}';
        `;
    return database.executar(gerarRelatorioFuncionarios);
    
}

function gerarLogs(idEmpresa, dataInicial, dataFinal, ){


    
}


module.exports = { 
    gerarCaptura,
    gerarTotens,
    gerarParametros,
    gerarFuncionarios,
    gerarLogs
 };
