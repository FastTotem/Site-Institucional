-- SQLBook: Code

-- ************************ MYSQL (Development) ************************
CREATE DATABASE IF NOT EXISTS fasttotem;
USE fasttotem;

-- Cria a tabela Endereco se ela não existir
CREATE TABLE IF NOT EXISTS endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(255),
    bairro VARCHAR(255),
    numero CHAR(7),
    complemento VARCHAR(255),
    cep VARCHAR(15)
);

-- Cria a tabela Empresa se ela não existir
CREATE TABLE IF NOT EXISTS empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    razaoSocial VARCHAR(120),
    cnpj CHAR(14),
    email VARCHAR(255),
    fkEndereco INT,
    FOREIGN KEY (fkEndereco) REFERENCES endereco (idEndereco)
);

-- Cria a tabela Usuario se ela não existir
CREATE TABLE IF NOT EXISTS usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    nivelAcesso ENUM('Administrador', 'Gerente' ,'Funcionario'),
    imgUsuario TEXT,
    statusUsuario ENUM('Ativo', 'Inativo'),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

-- Cria a tabela Totem se ela não existir
CREATE TABLE IF NOT EXISTS totem (
    idTotem INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    chaveDeAcesso VARCHAR(255),
    boardSerialNumber VARCHAR(255),
    statusTotem VARCHAR(255),
    jar VARCHAR(255),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
);

-- Cria a tabela InfoMaquina se ela não existir
CREATE TABLE IF NOT EXISTS infoMaquina (
    idInfoMaquina INT AUTO_INCREMENT PRIMARY KEY,
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
    idComponente INT AUTO_INCREMENT PRIMARY KEY,
    nomeComponente VARCHAR(255),
    tipoComponente VARCHAR(255),
    fkTotem INT,
    FOREIGN KEY (fkTotem) REFERENCES totem (idTotem)
);

-- Cria a tabela Captura se ela não existir
CREATE TABLE IF NOT EXISTS captura (
    idCaptura INT AUTO_INCREMENT PRIMARY KEY,
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
    idParametroAlerta INT AUTO_INCREMENT PRIMARY KEY,
    fkComponente INT,
    ideal INT,
    alerta INT,
    critico INT,
    notificacao INT,
    FOREIGN KEY (fkComponente) REFERENCES componente (idComponente)
);

DELETE FROM usuario WHERE email = 'TotemXpressFunc1@gmail.com';

select*from usuario;
select*from totem;

-- Inserções de exemplo
INSERT INTO endereco (logradouro, bairro, numero, complemento, cep) VALUES ('Avenida Hilário Pereira de Souza', 'Centro', '492', 'Piso 2', '06010170');
INSERT INTO empresa (razaoSocial, cnpj, email, fkEndereco) VALUES ('King Hamburgueria', '12345678978945', 'kinghamburgueria@mail.com', 1);
INSERT INTO totem (nome, chaveDeAcesso, statusTotem, jar, fkEmpresa) VALUES ('Totem 4', '1234','inativo','jar1' , 1);



-- ************************ SQL SERVER (Production) ************************
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'fasttotem')
BEGIN
    CREATE DATABASE fasttotem;
END
GO

USE fasttotem;
GO

-- Cria a tabela Endereco se ela não existir
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'endereco')
BEGIN
    CREATE TABLE endereco (
        idEndereco INT IDENTITY(1,1) PRIMARY KEY,
        logradouro VARCHAR(255),
        bairro VARCHAR(255),
        numero CHAR(7),
        complemento VARCHAR(255),
        cep VARCHAR(15)
    );
END
GO

-- Cria a tabela Empresa se ela não existir
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'empresa')
BEGIN
    CREATE TABLE empresa (
        idEmpresa INT IDENTITY(1,1) PRIMARY KEY,
        razaoSocial VARCHAR(120),
        cnpj CHAR(14),
        email VARCHAR(255),
        fkEndereco INT,
        FOREIGN KEY (fkEndereco) REFERENCES endereco (idEndereco)
    );
END
GO

-- Cria a tabela Usuario se ela não existir
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'usuario')
BEGIN
    CREATE TABLE usuario (
        idUsuario INT IDENTITY(1,1) PRIMARY KEY,
        nome VARCHAR(255),
        email VARCHAR(255),
        senha VARCHAR(255),
        nivelAcesso VARCHAR(20), -- Mapeado para VARCHAR no SQL Server
        imgUsuario TEXT,
        statusUsuario VARCHAR(20), -- Mapeado para VARCHAR no SQL Server
        fkEmpresa INT,
        FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
    );
END
GO

-- Cria a tabela Totem se ela não existir
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'totem')
BEGIN
    CREATE TABLE totem (
        idTotem INT IDENTITY(1,1) PRIMARY KEY,
        nome VARCHAR(255),
        chaveDeAcesso VARCHAR(255),
        boardSerialNumber VARCHAR(255),
        statusTotem VARCHAR(255),
        jar VARCHAR(255),
        fkEmpresa INT,
        FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa)
    );
END
GO

-- Cria a tabela InfoMaquina se ela não existir
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'infoMaquina')
BEGIN
    CREATE TABLE infoMaquina (
        idInfoMaquina INT IDENTITY(1,1) PRIMARY KEY,
        sistemaOperacional VARCHAR(200),
        fabricante VARCHAR(200),
        nomeProcessador VARCHAR(200),
        capacidadeRam FLOAT, -- Mapeado para FLOAT no SQL Server
        capacidadeDisco FLOAT, -- Mapeado para FLOAT no SQL Server
        fkTotem INT,
        FOREIGN KEY (fkTotem) REFERENCES totem (idTotem)
    );
END
GO

-- Cria a tabela Componente se ela não existir
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'componente')
BEGIN
    CREATE TABLE componente (
        idComponente INT IDENTITY(1,1) PRIMARY KEY,
        nomeComponente VARCHAR(255),
        tipoComponente VARCHAR(255),
        fkTotem INT,
        FOREIGN KEY (fkTotem) REFERENCES totem (idTotem)
    );
END
GO

-- Cria a tabela Captura se ela não existir
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'captura')
BEGIN
    CREATE TABLE captura (
        idCaptura INT IDENTITY(1,1) PRIMARY KEY,
        dataHora DATETIME,
        tipo VARCHAR(255),
        valor FLOAT, -- Mapeado para FLOAT no SQL Server
        fkComponente INT,
        fkTotem INT,
        FOREIGN KEY (fkComponente) REFERENCES componente (idComponente),
        FOREIGN KEY (fkTotem) REFERENCES totem (idTotem)
    );
END
GO

-- Cria a tabela ParametroAlerta se ela não existir
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'parametroAlerta')
BEGIN
    CREATE TABLE parametroAlerta (
        idParametroAlerta INT IDENTITY(1,1) PRIMARY KEY,
        fkComponente INT,
        ideal INT,
        alerta INT,
        critico INT,
        notificacao INT,
        FOREIGN KEY (fkComponente) REFERENCES componente (idComponente)
    );
END
GO

-- Inserções de exemplo
INSERT INTO endereco (logradouro, bairro, numero, complemento, cep) VALUES ('Avenida Hilário Pereira de Souza', 'Centro', '492', 'Piso 2', '06010170');
INSERT INTO empresa (razaoSocial, cnpj, email, fkEndereco) VALUES ('King Hamburgueria', '12345678978945', 'kinghamburgueria@mail.com', 1);
INSERT INTO totem (nome, chaveDeAcesso, statusTotem, jar, fkEmpresa) VALUES ('Totem 4', '1234', 'inativo', 'jar1', 1);
