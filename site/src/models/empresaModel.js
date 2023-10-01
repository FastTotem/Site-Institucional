var database = require("../database/config");

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(
  nome,
  cnpj,
  email,
  cep,
  rua,
  bairro,
  numero,
  complemento
) {
  var enderecoQuery = `INSERT INTO Endereco (Rua, Bairro, Numero, Complemento, CEP ) VALUES ('${rua}', '${bairro}', '${numero}', '${complemento}', '${cep}')`;

  return database
    .executar(enderecoQuery)
    .then(function (enderecoResultado) {
      var enderecoId = enderecoResultado.insertId;

      var empresaQuery = `INSERT INTO Empresa (Nome , CNPJ, Contato, fkEndereco) VALUES ('${nome}', '${cnpj}', '${email}', ${enderecoId})`;

      return database.executar(empresaQuery);
    })
    .then(function (empresaResultado) {
      return empresaResultado;
    })
    .catch(function (erro) {
      console.error("Erro ao cadastrar empresa:", erro);
      throw erro;
    });
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
