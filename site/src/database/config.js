var mysql = require("mysql2");
var sql = require('mssql');

var mySqlConfig = {
    host: "localhost",
    database: "fastTotem",
    user: "fastTotemAdmin",
    password: "fasttotem123",
};

//CRIAR USUÁRIO:
/*
    1º Acessar o cmd e digitar: mysql -u root -p
        -> root ou o nome do seu usuário padrão do mysql
    2º - CREATE USER 'fastTotemAdmin'@'localhost' IDENTIFIED BY 'fasttotem123';
    3º - GRANT ALL PRIVILEGES ON fastTotemAdmin.* TO 'fastTotemAdmin'@'localhost';
    4º - FLUSH PRIVILEGES;
*/

function executar(instrucao) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        return new Promise(function (resolve, reject) {
            sql.connect(sqlServerConfig).then(function () {
                return sql.query(instrucao);
            }).then(function (resultados) {
                console.log(resultados);
                resolve(resultados.recordset);
            }).catch(function (erro) {
                reject(erro);
                console.log('ERRO: ', erro);
            });
            sql.on('error', function (erro) {
                return ("ERRO NO SQL SERVER (Azure): ", erro);
            });
        });
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        return new Promise(function (resolve, reject) {
            var conexao = mysql.createConnection(mySqlConfig);
            conexao.connect();
            conexao.query(instrucao, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    reject(erro);
                }
                console.log(resultados);
                resolve(resultados);
            });
            conexao.on('error', function (erro) {
                return ("ERRO NO MySQL WORKBENCH: ", erro.sqlMessage);
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        });
    }
}

module.exports = {
    executar
}
