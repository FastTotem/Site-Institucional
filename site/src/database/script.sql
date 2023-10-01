-- SQLBook: Code
CREATE DATABASE FastTotem;
USE FastTotem;

CREATE TABLE Endereco (
    EnderecoID INT AUTO_INCREMENT PRIMARY KEY,
    Rua VARCHAR(255) NOT NULL,
    Bairro VARCHAR(255),
    Numero INT,
	Complemento VARCHAR(255),
    CEP VARCHAR(10)
);

CREATE TABLE Empresa (
    EmpresaID INT AUTO_INCREMENT PRIMARY KEY,
    CNPJ VARCHAR(255),
    Nome VARCHAR(255),
    fkEndereco INT,
    FOREIGN KEY (fkEndereco) REFERENCES Endereco(EnderecoID)
);

CREATE TABLE Usuario (
    UsuarioID INT AUTO_INCREMENT PRIMARY KEY,
    ImgUrl VARCHAR(255),
    Nome VARCHAR(255),
    NivelDeAcesso ENUM('Administrador', 'Gerente', 'Funcionario'),
    Email VARCHAR(255),
    Senha VARCHAR(255),
    EmpresaID INT,
    FOREIGN KEY (EmpresaID) REFERENCES Empresa(EmpresaID)
);

CREATE TABLE Totem (
    TotemID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255),
    EmpresaID INT,
    FOREIGN KEY (EmpresaID) REFERENCES Empresa(EmpresaID)
);

CREATE TABLE Componente (
    ComponenteID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) ,
    TotemID INT,
    FOREIGN KEY (TotemID) REFERENCES Totem(TotemID)
);

CREATE TABLE Captura (
    CapturaID INT AUTO_INCREMENT PRIMARY KEY,
    ComponenteID INT,
    DataHora DATETIME,
    Valor FLOAT
);

CREATE USER fastTotemAdmin@localhost IDENTIFIED BY 'fasttotem123';

select*from empresa join endereco on EnderecoID = Empresa.EmpresaID ;
