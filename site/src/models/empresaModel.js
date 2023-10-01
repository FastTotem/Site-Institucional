var database = require("../database/config");

function cadastrar(
  nome,
  cnpj,
  email,
  senha,
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

      var empresaQuery = `INSERT INTO Empresa (Nome , CNPJ, fkEndereco) VALUES ('${nome}', '${cnpj}', ${enderecoId})`;

      return database.executar(empresaQuery);
    })
    .then(function (empresaResultado) {

      var empresaID = empresaResultado.insertId;

      var usuarioQuery = `INSERT INTO Usuario (Nome, Email, Senha, NivelDeAcesso, fkEmpresa) VALUES ('${nome}Admin', '${email}', '${senha}', 'Administrador', ${empresaID})`;

      return database.executar(usuarioQuery);
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
