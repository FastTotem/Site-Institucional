var database = require("../database/config");
var usuarioModel = require("./usuarioModel");

function cadastrar(
  nome, 
  cnpj, 
  email, 
  cep, 
  rua, 
  bairro, 
  numero, 
  complemento,
  senha
) {
  var enderecoQuery = `INSERT INTO endereco (logradouro, bairro, numero, complemento, cep ) VALUES ('${rua}', '${bairro}', '${numero}', '${complemento}', '${cep}')`;

  return database
    .executar(enderecoQuery)
    .then(function (enderecoResultado) {
      var enderecoId = enderecoResultado.insertId;

      var empresaQuery = `INSERT INTO empresa (razaoSocial , cnpj, fkEndereco) VALUES ('${nome}', '${cnpj}', ${enderecoId})`;

      return database.executar(empresaQuery);
    })
    .then(function (empresaResultado) {

      var empresaID = empresaResultado.insertId;

      usuarioModel.cadastrar(nome, email, senha, empresaID, 'Administrador');
    })
    .then(function (usuarioResultado) {
      return usuarioResultado;
    })
    .catch(function (erro) {
      console.error("Erro ao cadastrar empresa ou usuário:", erro);
      throw erro;
    });
}

module.exports = { cadastrar };
