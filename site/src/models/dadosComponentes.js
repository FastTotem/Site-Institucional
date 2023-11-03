var database = require("../database/config")

function getChartsData(totemId) {
    var instrucao = `
        SELECT WEEKDAY(dataHora) as dataCaptura, tipoComponente, TRUNCATE(AVG(valor), 1) as valorCaptura FROM captura 
        JOIN componente
        ON componente.idComponente = captura.fkComponente
        JOIN totem 
        ON captura.fkTotem = totem.idTotem
        WHERE totem.idTotem = ${totemId}
        GROUP BY WEEKDAY(dataHora), tipoComponente;
    `;
    return database.executar(instrucao);
}

module.exports = {
    getChartsData,
};