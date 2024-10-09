CREATE DATABASE IF NOT EXISTS StaffWatch;
USE StaffWatch;
-- drop database staffwatch;

CREATE TABLE IF NOT EXISTS Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
CNPJ CHAR(18),
NomeEmp VARCHAR(45)
);

insert into Empresa values
(default, "123456789123456789", "Falla");

CREATE TABLE IF NOT EXISTS Token (
idToken INT PRIMARY KEY AUTO_INCREMENT,
Token VARCHAR(255),

fkEmpresa INT,
CONSTRAINT fkEmpresaToken FOREIGN KEY(fkEmpresa)
REFERENCES Empresa(idEmpresa)
);

CREATE TABLE IF NOT EXISTS Equipe (
idEquipe INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45),
Setor VARCHAR(45)
);

insert into Equipe values
(default,"dos","desenvolvimento");

CREATE TABLE IF NOT EXISTS cargo (
idCargo INT PRIMARY KEY AUTO_INCREMENT,
cargo VARCHAR(255)
);

insert into cargo values
(default, "Supervisor"),
(default, "Funcionário"),
(default, "Gerente de TI");

CREATE TABLE IF NOT EXISTS Funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45),
Email VARCHAR(45),
Senha VARCHAR(255),

fkEmpresa INT,
CONSTRAINT fkEmpresaFuncionario FOREIGN KEY(fkEmpresa)
REFERENCES Empresa(idEmpresa),

fkEquipe INT,
CONSTRAINT fkEquipeFuncionario FOREIGN KEY(fkEquipe)
REFERENCES Equipe(idEquipe),

fkCargo INT,
CONSTRAINT fkCargoFuncionario FOREIGN KEY(fkCargo)
REFERENCES cargo(idCargo)
);
insert into Funcionario values
(default,"Jeffinho","Jeffinho.botafogo@gmail.com",MD5("123456"),1,1,1);

CREATE TABLE IF NOT EXISTS Computador (
idComputador INT PRIMARY KEY AUTO_INCREMENT,

fkEquipe INT,
CONSTRAINT fkEquipeComputador FOREIGN KEY(fkEquipe)
REFERENCES Equipe(idEquipe)
);

insert into Computador values
(default,1);

CREATE TABLE IF NOT EXISTS Componente(
idComponente INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS auxComponente (
idAuxComponente INT PRIMARY KEY AUTO_INCREMENT,
unidadeMedida varchar(45),
descricao varchar(255),

fkComponente INT,
CONSTRAINT fkComponenteAuxComponente FOREIGN KEY(fkComponente)
REFERENCES componente(idComponente)
);

insert into Componente values
(default,"rede"),
(default,"memoria"),
(default,"disco"),
(default,"cpu");

insert into auxComponente values
(default,"rede","%", 1),
(default,"redeEnvio","bytes", 1),
(default,"redeRecebidos","bytes", 1),
(default,"pacoteRecebidos","qte", 1),
(default,"pacoteEnviados","qte", 1),
(default,"memoriaUso","byte", 2),
(default,"memoriaTotal","byte", 2),
(default,"memoriaPorcen","%", 2),
(default,"discoUso","byte", 3),
(default,"discoTotal","byte", 3),
(default,"discoPorcen","%", 3),
(default,"cpuPorcen","%", 4);

CREATE TABLE IF NOT EXISTS captura(
idCaptura int primary key auto_increment,
captura decimal(2,1),
dataCaptura DATETIME,
fkComponente INT,
CONSTRAINT ComponenteComputador1 FOREIGN KEY(fkComponente)
REFERENCES Componente(idComponente),
    
fkComputador INT,
CONSTRAINT ComputadorComponente FOREIGN KEY(fkComputador)
REFERENCES Computador(idComputador)
);

CREATE TABLE IF NOT EXISTS Alerta(
idAlerta INT PRIMARY KEY AUTO_INCREMENT,

fkCaptura INT,
CONSTRAINT fkAlertaCaptura FOREIGN KEY(fkCaptura)
REFERENCES captura(idCaptura)
);

