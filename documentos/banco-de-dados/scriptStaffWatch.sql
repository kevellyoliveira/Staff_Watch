CREATE DATABASE IF NOT EXISTS StaffWatch;
USE StaffWatch;

-- DROP DATABASE Staffwatch;


CREATE TABLE IF NOT EXISTS componente(
idComponente INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS auxComponente (
idAuxComponente INT PRIMARY KEY AUTO_INCREMENT,
unidadeMedida varchar(45),
descricao varchar(255),

fkComponente INT,
CONSTRAINT fkComponenteAuxComponente FOREIGN KEY(fkComponente)
REFERENCES componente(idComponente)
);

insert into componente values
(default,"rede"),
(default,"memoria"),
(default,"disco"),
(default,"cpu"),
(default, "processos");
-- select * from auxComponente;
-- select count(*) from computador where idComputador = 1;
insert into auxComponente values
(default,"redeUso","%", 1),
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
(default,"cpuPorcen","%", 4),

-- looca
(default,"redeRecebidosLooca","bytes", 1),
(default,"redeEnviadosLooca","bytes", 1),
(default,"pacoteEnviadosLooca","qte", 1),
(default,"pacoteRecebidosLooca","qte", 1),
(default,"totalServiçosLooca","qte", 5),
(default,"totalProcessosLooca","qte", 5),
(default,"tempoAtividadeLooca","segundos", 5);


CREATE TABLE IF NOT EXISTS empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(18),
nomeEmp VARCHAR(45)
);

insert into empresa (idEmpresa, cnpj, nomeEmp) values
(default, "123456789123456789", "Falla");


CREATE TABLE IF NOT EXISTS equipe (
idEquipe INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
setor VARCHAR(45),
fkEmpresa int,
constraint fkEmpresaEquipe foreign key(fkEmpresa)
references empresa(idEmpresa)
);

insert into equipe values
(default,"dos","desenvolvimento", 1);

CREATE TABLE IF NOT EXISTS cargo (
idCargo INT PRIMARY KEY AUTO_INCREMENT,
cargo VARCHAR(255)
);

insert into cargo values
(default, "Suporte de TI"),
(default, "Gerente de Operações"),
(default, "Gerente de TI"),
(default, "Operador");


CREATE TABLE IF NOT EXISTS funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
telefone VARCHAR(25),
senha VARCHAR(255),
status TINYINT(1) DEFAULT 1,

fkEmpresa INT,
CONSTRAINT fkEmpresaFuncionario FOREIGN KEY(fkEmpresa)
REFERENCES empresa(idEmpresa),

fkEquipe INT,
CONSTRAINT fkEquipeFuncionario FOREIGN KEY(fkEquipe)
REFERENCES equipe(idEquipe),

fkCargo INT,
CONSTRAINT fkCargoFuncionario FOREIGN KEY(fkCargo)
REFERENCES cargo(idCargo)
);




insert into funcionario (nome, email, telefone, senha, fkEmpresa, fkEquipe, fkCargo) values
("Jeffinho", "Jeffinho.botafogo@gmail.com", "11 956836220" , MD5("123456"), 1, 1, 1);

CREATE TABLE IF NOT EXISTS computador (
idComputador INT PRIMARY KEY AUTO_INCREMENT,

status INT DEFAULT 1,

fkEquipe INT,
CONSTRAINT fkEquipeComputador FOREIGN KEY(fkEquipe)
REFERENCES equipe(idEquipe),

fkEmpresa INT,
CONSTRAINT fkEmpresaComputador FOREIGN KEY(fkEmpresa)
REFERENCES empresa(idEmpresa),

fkFuncionario INT,
CONSTRAINT fkFuncionarioComputador FOREIGN KEY(fkFuncionario)
REFERENCES funcionario(idFuncionario)
);

insert into computador values
(default,TRUE,1,1,1);

CREATE TABLE IF NOT EXISTS captura(
idCaptura int primary key auto_increment,
captura BIGINT,
dataCaptura DATETIME,

fkComponente INT,
CONSTRAINT componenteComputador1 FOREIGN KEY(fkComponente)
REFERENCES componente(idComponente),
    
fkComputador INT,
CONSTRAINT computadorComponente FOREIGN KEY(fkComputador)
REFERENCES computador(idComputador),

fkAuxComponente INT,
CONSTRAINT capturaAuxComponente FOREIGN KEY (fkAuxComponente)
REFERENCES auxComponente(idAuxComponente)
);

CREATE TABLE IF NOT EXISTS alerta(
idAlerta INT PRIMARY KEY AUTO_INCREMENT,

fkCaptura INT,
CONSTRAINT fkAlertaCaptura FOREIGN KEY(fkCaptura)
REFERENCES captura(idCaptura)
);

CREATE OR REPLACE VIEW view_computador_funcionario_equipe AS
SELECT 
    computador.idComputador,
    computador.status,
    computador.fkEquipe,
    computador.fkEmpresa,
    computador.fkFuncionario,
    funcionario.nome AS nomeFuncionario,
    equipe.nome AS nomeEquipe
FROM computador
JOIN funcionario ON computador.fkFuncionario = funcionario.idFuncionario
JOIN equipe ON computador.fkEquipe = equipe.idEquipe;
SELECT 
    idComputador,
    status,
    fkEquipe,
    fkEmpresa,
    fkFuncionario,
    nomeFuncionario,
    nomeEquipe
FROM view_computador_funcionario_equipe;

select idFuncionario, nome, email, status, fkEmpresa, fkEquipe, fkCargo from funcionario;
    
-- select * from token;
select * from funcionario;


CREATE TABLE IF NOT EXISTS modelo (
idModelo INT PRIMARY KEY AUTO_INCREMENT,
nome varchar(255),
fkComputador int,
CONSTRAINT fkmodeloComputador FOREIGN KEY(fkComputador)
REFERENCES computador(idComputador),
fkEmpresa INT,
CONSTRAINT fkmodeloEmpresa FOREIGN KEY(fkEmpresa)
REFERENCES empresa(idEmpresa),
fkComponente int,
CONSTRAINT fkmodeloComponente FOREIGN KEY(fkComponente)
REFERENCES componente (idComponente),
fkFuncionario INT,
CONSTRAINT fkmodeloFuncionario FOREIGN KEY(fkFuncionario)
REFERENCES funcionario(idFuncionario)
);


desc modelo;

select fkComputador, fkEquipe, modelo.nome as modelo, funcionario.nome from modelo join funcionario on modelo.fkFuncionario = funcionario.idFuncionario where funcionario.fkEmpresa = 1;



