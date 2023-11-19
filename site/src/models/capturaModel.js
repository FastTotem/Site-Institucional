var database = require('../database/config');

function listarOcorrenciasCriticas(idEmpresa) {

    var capturasQuery = `
    SELECT
    c.tipo AS tipoComponente,
    COUNT(CASE WHEN c.valor >= pa.critico THEN 1 END) AS ocorrenciasCriticas
FROM
    captura c
JOIN
    componente comp ON c.fkComponente = comp.idComponente
JOIN
    totem t ON c.fkTotem = t.idTotem
JOIN
    empresa e ON t.fkEmpresa = e.idEmpresa
JOIN
    parametroAlerta pa ON comp.tipoComponente = pa.componente AND e.idEmpresa = pa.fkEmpresa
WHERE
    c.tipo IN ('TAXA_TRANSFERENCIA', 'MEMORIA', 'PROCESSADOR')
    AND e.idEmpresa = ${idEmpresa}
    AND DATE(c.dataHora) = CURDATE() 
    AND c.dataHora >= CURDATE()        
    AND c.dataHora < CURDATE() + INTERVAL 1 DAY
GROUP BY
    c.tipo
ORDER BY
    tipoComponente;
    `;

    return database.executar(capturasQuery);
}

function listarUptime(idEmpresa){

    var capturasQuery = `
    SELECT
    t.nome AS nomeTotem,
    c.*
FROM
    totem t
JOIN captura c ON t.idTotem = c.fkTotem
WHERE
    t.fkEmpresa = ${idEmpresa}
    AND c.tipo = 'TEMPO_ATIVIDADE'
    AND c.dataHora = (
        SELECT
            MAX(dataHora)
        FROM
            captura
        WHERE
            fkTotem = t.idTotem
            AND tipo = 'TEMPO_ATIVIDADE'
            );
    `;

    return database.executar(capturasQuery);

}

function listarCapturasComponentes(idEmpresa){

    var capturasQuery = `
    SELECT
    HOUR(c.dataHora) AS hora,
    c.tipo AS tipoComponente,
    AVG(c.valor) AS mediaCaptura
FROM
    captura c
JOIN componente comp ON c.fkComponente = comp.idComponente
JOIN totem t ON c.fkTotem = t.idTotem
JOIN empresa e ON t.fkEmpresa = e.idEmpresa
WHERE
    (c.tipo = 'MEMORIA' OR c.tipo = 'PROCESSADOR') 
    AND e.idEmpresa = ${idEmpresa}
GROUP BY
    hora, tipoComponente, c.tipo 
ORDER BY
    hora, tipoComponente;
    `;

    return database.executar(capturasQuery);

}

function getChartsData(totemId) {
    var instrucao = `
        SELECT DATE_FORMAT(dataHora, '%d/%m') as dataMes, WEEKDAY(dataHora) as dataCaptura, tipoComponente, nomeComponente, captura.tipo, TRUNCATE(AVG(valor), 1) as valorCaptura FROM captura 
        JOIN componente
        ON componente.idComponente = captura.fkComponente
        JOIN totem 
        ON captura.fkTotem = totem.idTotem
        WHERE totem.idTotem = ${totemId} AND
        DAY(dataHora) > DAY(CURRENT_DATE()) - 7
        GROUP BY WEEKDAY(dataHora), DATE_FORMAT(dataHora, '%d/%m'), tipoComponente, captura.tipo, nomeComponente;
    `;
    return database.executar(instrucao);
}

function getKPIsData(totemId) {
    var instrucao = `
        SELECT tipo, valor AS valorCaptura FROM (SELECT tipo, valor,
		ROW_NUMBER() OVER (PARTITION BY tipo ORDER BY dataHora DESC) AS row_num
        FROM captura JOIN totem 
        ON totem.idTotem = captura.fkTotem
        WHERE totem.idTotem = ${totemId} AND captura.tipo IN ('MEMORIA', 'PROCESSADOR', 'USB', 'TEMPO_ATIVIDADE', 'TAXA_TRANSFERENCIA')
        ) subquery WHERE row_num = 1;
    `;
    return database.executar(instrucao);
}

module.exports = {
    getChartsData,
    getKPIsData,
    listarOcorrenciasCriticas,
    listarUptime,
    listarCapturasComponentes
};
