var database = require("../database/config")

function getChartsData(totemId) {
    var instrucao = `
        SELECT DATE_FORMAT(dataHora, "%d/%m") as dataMes, WEEKDAY(dataHora) as dataCaptura, tipoComponente, nomeComponente, captura.tipo, TRUNCATE(AVG(valor), 1) as valorCaptura FROM captura 
        JOIN componente
        ON componente.idComponente = captura.fkComponente
        JOIN totem 
        ON captura.fkTotem = totem.idTotem
        WHERE totem.idTotem = ${totemId} AND
        DAY(dataHora) > DAY(CURRENT_DATE()) - 7
        GROUP BY WEEKDAY(dataHora), DATE_FORMAT(dataHora, "%d/%m"), tipoComponente, captura.tipo, nomeComponente;
    `;
    return database.executar(instrucao);
}

function getKPIsData(totemId) {
    var instrucao = `
        SELECT tipo, valor AS valorCaptura FROM (SELECT tipo, valor,
		ROW_NUMBER() OVER (PARTITION BY tipo ORDER BY dataHora DESC) AS row_num
        FROM captura JOIN totem 
        ON totem.idTotem = captura.fkTotem
        WHERE totem.idTotem = ${totemId} AND captura.tipo IN ("MEMORIA", "PROCESSADOR", "USB", "TEMPO_ATIVIDADE", "TAXA_TRANSFERENCIA")
        ) subquery WHERE row_num = 1;
    `;
    return database.executar(instrucao);
}

module.exports = {
    getChartsData,
    getKPIsData
};