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
  if(process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
    enderecoQuery = `
      INSERT INTO endereco (logradouro, bairro, numero, complemento, cep ) 
      OUTPUT INSERTED.idEndereco as enderecoID
      VALUES ('${rua}', '${bairro}', '${numero}', '${complemento}', '${cep}')
    `;
  }

  return database
    .executar(enderecoQuery)
    .then(function (enderecoResultado) {
      var enderecoId = process.env.AMBIENTE_PROCESSO === "desenvolvimento" ? enderecoResultado.insertId : enderecoResultado[0].enderecoID;

      var empresaQuery = `INSERT INTO empresa (razaoSocial , cnpj, fkEndereco) VALUES ('${nome}', '${cnpj}', ${enderecoId})`;

      if(process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        empresaQuery = `
          INSERT INTO empresa (razaoSocial , cnpj, fkEndereco) 
          OUTPUT INSERTED.idEmpresa as empresaID
          VALUES ('${nome}', '${cnpj}', ${enderecoId})
        `;
      }

      return database.executar(empresaQuery);
    })
    .then(function (empresaResultado) {
      var empresaID = process.env.AMBIENTE_PROCESSO === "desenvolvimento" ? empresaResultado.insertId : empresaResultado[0].empresaID;
    
      var nomeAdmin = `${nome} Admin`
      usuarioModel.cadastrar(nomeAdmin, email, senha, 'Administrador', empresaID,);
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
