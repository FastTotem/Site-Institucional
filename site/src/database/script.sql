-- SQLBook: Code
CREATE DATABASE fastTotem;
USE fasttotem;

CREATE TABLE Empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	razaoSocial VARCHAR(120),
	CNPJ CHAR(14),
	email VARCHAR(45),
	tel VARCHAR(15)
);

CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(15),
email VARCHAR(15),
senha VARCHAR(15),
nivelAcesso ENUM('Administrador','Funcionário'),
imgUsuario TEXT(255),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
 ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE Endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
logradouro VARCHAR(255),
bairro VARCHAR(255),
numero CHAR(7),
complemento VARCHAR(255),
cep VARCHAR(15)
);

CREATE TABLE Totem(
	idTotem INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	chaveDeAcesso VARCHAR(45),
	fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE InfoMaquina(
	idInfoMaquina INT PRIMARY KEY AUTO_INCREMENT,
	sistemaOperacional VARCHAR(200),
	fabricante  VARCHAR(200),
	nomeProcessador VARCHAR(200),
	capacidadeRam VARCHAR(200),
	capacidadeDisco VARCHAR(200),
	fkTotem INT,
	FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem)
     ON DELETE NO ACTION
	 ON UPDATE NO ACTION
);

CREATE TABLE Componente(
idComponente INT PRIMARY KEY AUTO_INCREMENT,
nomeComponente VARCHAR(45)
);

CREATE TABLE Captura (
idCaptura INT PRIMARY KEY AUTO_INCREMENT,
dataHora DATETIME,
tipo VARCHAR(55),
valor DOUBLE,
fkComponente INT,
	FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
     ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE Metrica (
    idMetrica INT PRIMARY KEY AUTO_INCREMENT,
    valorUtilizado int,
    unidadeMedida VARCHAR(45),
    dataHora VARCHAR(45),
    fkTotem INT,
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    fkComponente INT,
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);

CREATE TABLE ParametroAlerta(
idParametroAlerta INT PRIMARY KEY AUTO_INCREMENT,
fkComponente INT,
ideal INT,
atencao INT,
alerta INT,
FOREIGN KEY (fkComponente) REFERENCES Componente (idComponente)
 ON DELETE NO ACTION
    ON UPDATE NO ACTION
); 

CREATE TABLE infSistema(
idInfSistema INT PRIMARY KEY AUTO_INCREMENT,
porcentagemHD  DECIMAL(5,2),
porcentagemMem  DECIMAL(5,2),
porcentagemProc DECIMAL(5,2),
dataHora VARCHAR(45),
fkTotem INT,
FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);


select*From Empresa;
select*From Totem;
select*From InfoMaquina;
select*From ConfiguracaoComponente;
select*From Componente;
select*From ParametroAlerta;
select*From Metrica;


CREATE USER fastTotemAdmin@localhost IDENTIFIED BY 'fasttotem123';

select*from empresa join endereco on EnderecoID = Empresa.EmpresaID join Usuario on Usuario.fkEmpresa = EmpresaID ;
GRANT ALL PRIVILEGES ON FastTotem.* TO 'fastTotemAdmin'@'localhost';
FLUSH PRIVILEGES;
