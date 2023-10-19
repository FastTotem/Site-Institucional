var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var cnpj = req.body.cnpjServer;
  var email = req.body.emailServer;
  var cep = req.body.cepServer;
  var rua = req.body.ruaServer;
  var bairro = req.body.bairroServer;
  var numero = req.body.numeroServer;
  var complemento = req.body.complementoServer;
  var senha = req.body.senhaServer;

  if (nome == undefined || nome.trim() === "") {
    res.status(400).send("O nome não pode estar vazio!");
  } else if (cnpj == undefined || cnpj.trim() === "") {
    res.status(400).send("O CNPJ não pode estar vazio!");
  } else if (email == undefined || email.trim() === "") {
    res.status(400).send("O email não pode estar vazio!");
  } else if (cep == undefined || cep.trim() === "") {
    res.status(400).send("O CEP não pode estar vazio!");
  } else if (rua == undefined || rua.trim() === "") {
    res.status(400).send("A rua não pode estar vazia!");
  } else if (bairro == undefined || bairro.trim() === "") {
    res.status(400).send("O bairro não pode estar vazio!");
  } else if (numero == undefined || numero.trim() === "") {
    res.status(400).send("O número não pode estar vazio!");
  } else{ 
        empresaModel
      .cadastrar(nome, cnpj, email, cep, rua, bairro, numero, complemento, senha)
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
  }
}

module.exports = {
  cadastrar,
};
