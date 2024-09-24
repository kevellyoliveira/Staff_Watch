CREATE DATABASE IF NOT EXISTS StaffWatch;
USE StaffWatch;

CREATE TABLE  IF NOT EXISTS Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
CNPJ CHAR(18),
Nome VARCHAR(45),
Email VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS Token (
idToken INT PRIMARY KEY AUTO_INCREMENT,
Token VARCHAR(45),

fkEmpresa INT,
CONSTRAINT fkEmpresaToken FOREIGN KEY(fkEmpresa)
REFERENCES Empresa(idEmpresa)
);

CREATE TABLE IF NOT EXISTS Equipe (
idEquipe INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45),
Setor VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS Funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45),
Email VARCHAR(45),
Senha VARCHAR(45),
fkEmpresa INT,

CONSTRAINT fkEmpresaFuncionario FOREIGN KEY(fkEmpresa)
REFERENCES Empresa(idEmpresa),

fkEquipe INT,
CONSTRAINT fkEquipeFuncionario FOREIGN KEY(fkEquipe)
REFERENCES Equipe(idEquipe),

fkGerente INT,
CONSTRAINT fkGerenteFuncionario FOREIGN KEY(fkGerente)
REFERENCES Funcionario(idFuncionario)
);

CREATE TABLE  IF NOT EXISTS Computador (
idComputador INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45),
SO VARCHAR(45),
fkEquipe INT,
CONSTRAINT fkEquipeComputador FOREIGN KEY(fkEquipe)
REFERENCES Equipe(idEquipe)
);

CREATE TABLE IF NOT EXISTS Componente(
idComponente INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45)
);

CREATE TABLE  IF NOT EXISTS ComponenteComputador(
fkComponente INT,
CONSTRAINT ComponenteComputador FOREIGN KEY(fkComponente)
REFERENCES Componente(idComponente),

fkComputador INT,
CONSTRAINT ComputadorComponente FOREIGN KEY(fkComputador)
REFERENCES Computador(idComputador),

PRIMARY KEY(fkComponente,fkComputador)
);

CREATE TABLE IF NOT EXISTS Alerta(
idAlerta INT PRIMARY KEY AUTO_INCREMENT,

fkComponente INT,
CONSTRAINT AlertaComponente FOREIGN KEY(fkComponente)
REFERENCES Componente(idComponente),

fkComputador INT,
CONSTRAINT AlertaComputador FOREIGN KEY(fkComputador)
REFERENCES Computador(idComputador)
);


