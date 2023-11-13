var database = require("../database/config");

function listarOcorrenciasCriticas(idEmpresa) {

    var capturasQuery = `
        SELECT
        comp.tipoComponente,
        COUNT(*) AS totalOcorrenciasCriticas
    FROM
        captura c
    JOIN
        componente comp ON c.fkComponente = comp.idComponente
    JOIN
        parametroAlerta p ON comp.idComponente = p.fkComponente
    JOIN
        totem t ON comp.fkTotem = t.idTotem
    WHERE
        c.dataHora >= CURDATE() AND c.dataHora < CURDATE() + INTERVAL 1 DAY
        AND c.valor >= p.critico
        AND t.fkEmpresa = ${idEmpresa}
    GROUP BY
        comp.tipoComponente; 
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

module.exports = {
    listarOcorrenciasCriticas,
    listarUptime,
    listarCapturasComponentes
}