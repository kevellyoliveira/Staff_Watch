CREATE DATABASE IF NOT EXISTS StaffWatch;
USE StaffWatch;
-- drop database staffwatch;

CREATE TABLE IF NOT EXISTS Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
CNPJ CHAR(18),
NomeEmp VARCHAR(45),
EmailRep VARCHAR(45),
senhaRep VARCHAR(45),
NomeRep VARCHAR(45)
);

insert into Empresa values
(default, "123456789123456789", "Falla", "aristeu.futuro@gmail.com", MD5("senha123"), "Aristeu");

-- CREATE TABLE IF NOT EXISTS Token (
-- idToken INT PRIMARY KEY AUTO_INCREMENT,
-- Token VARCHAR(45),

-- fkEmpresa INT,
-- CONSTRAINT fkEmpresaToken FOREIGN KEY(fkEmpresa)
-- REFERENCES Empresa(idEmpresa)
-- );

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
(default,"Jeffinho","Jeffinho.botafogo@gmail.com",MD5("123456"),1,1,1);

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
(default,1,1),
(default,1,1);

Select count(*) from Computador where idComputador = 2;
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
(default,"redeRecebidosLooca","bytes"),
(default,"redeEnviadosLooca","bytes"),
(default,"pacoteEnviadosLooca","qte"),
(default,"pacoteRecebidosLooca","qte"),
(default,"totalServiçosLooca","qte"),
(default,"totalProcessosLooca","qte"),
(default,"tempoAtividadeLooca","qte");
;

CREATE TABLE IF NOT EXISTS Log(
idRegistro int primary key auto_increment,
Registro bigint,
dataRegistro DATETIME,
fkComponente INT,
CONSTRAINT ComponenteComputador1 FOREIGN KEY(fkComponente)
REFERENCES Componente(idComponente),
    
fkComputador INT,
CONSTRAINT ComputadorComponente FOREIGN KEY(fkComputador)
REFERENCES Computador(idComputador)
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

select * from empresa;
select * from funcionario;

SELECT idFuncionario, Nome, Email
        FROM funcionario WHERE email = 'Jeffinho.botafogo@gmail.com' AND senha = '123456';
select * from componente;
