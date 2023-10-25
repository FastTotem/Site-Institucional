	-- SQLBook: Code

	-- Verifica se o banco de dados 'fastTotem' existe
	CREATE DATABASE IF NOT EXISTS fasttotem;
	USE fasttotem;

	-- Cria a tabela Endereco se ela não existir
	CREATE TABLE IF NOT EXISTS endereco (
		idEndereco INT PRIMARY KEY AUTO_INCREMENT,
		logradouro VARCHAR(255),
		bairro VARCHAR(255),
		numero CHAR(7),
		complemento VARCHAR(255),
		cep VARCHAR(15)
	);

	-- Cria a tabela Empresa se ela não existir
	CREATE TABLE IF NOT EXISTS empresa (
		idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
		razaoSocial VARCHAR(120),
		cnpj CHAR(14),
		email VARCHAR(255),
		fkEndereco INT,
		FOREIGN KEY (fkEndereco) REFERENCES endereco (idEndereco)
	);

	-- Cria a tabela Usuario se ela não existir
	CREATE TABLE IF NOT EXISTS usuario (
		idUsuario INT PRIMARY KEY AUTO_INCREMENT,
		nome VARCHAR(255),
		email VARCHAR(255),
		senha VARCHAR(255),
		nivelAcesso ENUM('Administrador', 'Funcionário'),
		imgUsuario TEXT(255),
		fkEmpresa INT,
		FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
	);

	-- Cria a tabela Totem se ela não existir
	CREATE TABLE IF NOT EXISTS totem (
		idTotem INT PRIMARY KEY AUTO_INCREMENT,
		nome VARCHAR(255),
		chaveDeAcesso VARCHAR(255),
		boardSerialNumber VARCHAR(255),
		fkEmpresa INT,
		FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
	);

	-- Cria a tabela InfoMaquina se ela não existir
	CREATE TABLE IF NOT EXISTS infoMaquina (
		idInfoMaquina INT PRIMARY KEY AUTO_INCREMENT,
		sistemaOperacional VARCHAR(200),
		fabricante VARCHAR(200),
		nomeProcessador VARCHAR(200),
		capacidadeRam DOUBLE,
		capacidadeDisco DOUBLE,
		fkTotem INT,
		FOREIGN KEY (fkTotem) REFERENCES totem (idTotem)
	);

	-- Cria a tabela Componente se ela não existir
	CREATE TABLE IF NOT EXISTS componente (
		idComponente INT PRIMARY KEY AUTO_INCREMENT,
		nomeComponente VARCHAR(255),
		tipoComponente VARCHAR(255),
		fkTotem INT,
		FOREIGN KEY (fkTotem) REFERENCES totem (idTotem)
	);

	-- Cria a tabela Captura se ela não existir
	CREATE TABLE IF NOT EXISTS captura (
		idCaptura INT PRIMARY KEY AUTO_INCREMENT,
		dataHora DATETIME,
		tipo VARCHAR(255),
		valor DOUBLE,
		fkComponente INT,
		fkTotem INT,
		FOREIGN KEY (fkComponente) REFERENCES componente (idComponente),
		FOREIGN KEY (fkTotem) REFERENCES totem (idTotem)
	);

	-- Cria a tabela ParametroAlerta se ela não existir
	CREATE TABLE IF NOT EXISTS parametroAlerta (
		idParametroAlerta INT PRIMARY KEY AUTO_INCREMENT,
		fkComponente INT,
		ideal INT,
		alerta INT,
		critico INT,
		notificacao INT,
		FOREIGN KEY (fkComponente) REFERENCES componente (idComponente)
	);

	INSERT INTO endereco (logradouro, bairro, numero, complemento, cep) VALUES ('Avenida Hilário Pereira de Souza', 'Centro', '492', 'Piso 2', '06010170');
	INSERT INTO empresa (razaoSocial, cnpj, email, fkEndereco) VALUES ('King Hamburgueria', '12345678978945', 'kinghamburgueria@mail.com', 1);
	INSERT INTO totem (nome, chaveDeAcesso, fkEmpresa) VALUES ('Totem01', '1234', 1);
