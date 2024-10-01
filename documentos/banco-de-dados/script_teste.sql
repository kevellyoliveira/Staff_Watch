CREATE DATABASE IF NOT EXISTS StaffWatch;
USE StaffWatch;

CREATE TABLE IF NOT EXISTS Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
CNPJ CHAR(18),
NomeEmp VARCHAR(45),
EmailRep VARCHAR(45),
senhaRep VARCHAR(45),
NomeReo VARCHAR(45)
);
insert into Empresa values
(default, "123456789123456789","Aristeu","aristeu.futuro@gmail.com");

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
Setor VARCHAR(45),
fkEmpresa int,
constraint fkEmpresaEquipe foreign key(fkEmpresa)
references Empresa(idEmpresa)
);
insert into Equipe values
(default,"dos","11",1);

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
insert into Funcionario values
(default,"Jeffinho","Jeffinho.botafogo@gmail.com","123456",1,1,1);

CREATE TABLE IF NOT EXISTS Computador (
idComputador INT PRIMARY KEY AUTO_INCREMENT,
fkEquipe INT,
CONSTRAINT fkEquipeComputador FOREIGN KEY(fkEquipe)
REFERENCES Equipe(idEquipe),
fkEmpresa int,
constraint fkEmpresaComputador foreign key(fkEmpresa)
references Empresa(idEmpresa)
);

insert into Computador values
(default,"Comp1-Aristeu","Ubuntu",1,1);

CREATE TABLE IF NOT EXISTS Componente(
idComponente INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(45),
metricas varchar(45)
);

insert into Componente values
(default,"rede","%"),
(default,"redeEnvio","bytes"),
(default,"redeRecebidos","bytes"),
(default,"pacoteRecebidos","qte"),
(default,"pacoteEnviados","qte"),
(default,"memoriaUso","byte"),
(default,"memoriaTotal","byte"),
(default,"memoriaPorcen","%"),
(default,"discoUso","byte"),
(default,"discoTotal","byte"),
(default,"discoPorcen","%"),
(default,"cpuPorcen","%");

CREATE TABLE IF NOT EXISTS Log(
idRegistro int primary key auto_increment,
Registro decimal(2,1),
dataRegistro DATETIME,
fkComponente INT,
CONSTRAINT ComponenteComputador FOREIGN KEY(fkComponente)
REFERENCES Componente(idComponente),
    
fkComputador INT,
CONSTRAINT ComputadorComponente FOREIGN KEY(fkComputador)
REFERENCES Computador(idComputador)
);

alter table ComponenteComputador
modify column Registro decimal(7,2);

CREATE TABLE IF NOT EXISTS Alerta(
idAlerta INT PRIMARY KEY AUTO_INCREMENT,

fkComponente INT,
CONSTRAINT AlertaComponente FOREIGN KEY(fkComponente)
REFERENCES Componente(idComponente),

fkComputador INT,
CONSTRAINT AlertaComputador FOREIGN KEY(fkComputador)
REFERENCES Computador(idComputador)
);

