var relatorioModel = require("../models/relatorioModel");

function gerar(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var dataInicial = req.params.dataInicial;
    var dataFinal = req.params.dataFinal;
    var tipo = req.params.tipo;
  
    if (idEmpresa == undefined) {
      res.status(400).send("idEmpresa não pode estar vazio!");
    } else if (dataInicial == undefined) {
        res.status(400).send("Data inicial não pode estar vazio!");
    } else if (dataFinal == undefined) {
        res.status(400).send("Data final não pode estar vazio!");
    } else if (tipo == undefined) {
        res.status(400).send("Tipo não pode estar vazio!");
    } else { 

      switch (tipo) {
        case "capturas":
          relatorioModel
            .gerarCaptura(idEmpresa, dataInicial, dataFinal)
            .then(function (resultado) {
              res.json(resultado);
            })
            .catch(function (erro) {
              console.log(erro);
              console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
            });
          break;
      
        case "totens":
          relatorioModel
            .gerarTotens(idEmpresa, dataInicial, dataFinal)
            .then(function (resultado) {
              res.json(resultado);
            })
            .catch(function (erro) {
              console.log(erro);
              console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
            });
          break;
      
        case "parametros":
          relatorioModel
            .gerarParametros(idEmpresa, dataInicial, dataFinal)
            .then(function (resultado) {
              res.json(resultado);
            })
            .catch(function (erro) {
              console.log(erro);
              console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
            });
          break;
      
        case "funcionarios":
          relatorioModel
            .gerarFuncionarios(idEmpresa, dataInicial, dataFinal)
            .then(function (resultado) {
              res.json(resultado);
            })
            .catch(function (erro) {
              console.log(erro);
              console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
            });
          break;
      
        case "logs":
          relatorioModel
            .gerarLogs(idEmpresa, dataInicial, dataFinal)
            .then(function (resultado) {
              res.json(resultado);
            })
            .catch(function (erro) {
              console.log(erro);
              console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
            });
          break;
      
        default:
          res.status(400).send("Insira um tipo válido!");
      }      

    }
  }

module.exports = {
    gerar
  };
