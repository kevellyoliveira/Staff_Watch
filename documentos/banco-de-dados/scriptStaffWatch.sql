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
(default, "modelo CPU", "nome", 4),
(default, "modelo Disco", "nome", 3),
(default, "modelo Rede", "nome", 1),
(default, "modelo RAM", "arm. total", 2),

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

select * from auxComponente;

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
modelo VARCHAR(455),

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
JOIN equipe ON computador.fkEquipe = equipe.idEquipe where funcionario.fkCargo = 4 order by status;

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

CREATE TABLE IF NOT EXISTS chamada(
idChamada int primary key auto_increment,
chamadaRecebida int,
chamadaAtendida int,
chamadaPerdida int,
tempoChamada int,
tempoEspera int,

fkFuncionario INT,
CONSTRAINT funcionarioChamada FOREIGN KEY(fkFuncionario)
REFERENCES funcionario(idFuncionario),

fkEmpresa INT,
CONSTRAINT empresaChamada FOREIGN KEY(fkEmpresa)
REFERENCES empresa(idEmpresa)
);


-- ------------------------ TESTES DE ALERTA & DESENVOLVIMENTO --------------------------------------------------
insert into funcionario values
(default, "teste", "teste@gmail.com", "11956782706", MD5("Aa1!"), 1,1, null, 1);

insert into funcionario (nome, email, telefone, fkEmpresa, fkEquipe, fkCargo) values
("Ana Clara", "anaclara@gmail.com", "11956782736", 1, 1, 4),
("Júlio Cesar", "julio@gmail.com", "11956781234", 1, 1, 4),
("Beatriz Angola", "bea@gmail.com", "11951234736", 1, 1, 4),
("Sérgio Lucas", "sergio@gmail.com", "11990082736", 1, 1, 4);

insert into computador (fkEquipe, fkEmpresa, fkFuncionario) values
(1, 1, 3),
(1, 1, 4),
(1, 1, 5),
(1, 1, 6);

select * from captura order by idCaptura desc limit 15;

INSERT INTO alerta (fkCaptura) VALUES 
(1),
(382),
(720);

select * from computador;
desc captura;

-- exibindo detalhes a serem exibidos na tela dos alertas!
select ca.captura, ca.dataCaptura, 
co.nome, aux.unidadeMedida, aux.descricao,
ca.fkComputador, 
maq.fkEquipe 
from captura ca
right join alerta a on a.fkCaptura = ca.idCaptura
join componente co on co.idComponente = ca.fkComponente
join auxcomponente aux on aux.idAuxComponente = ca.fkAuxComponente
join computador maq on maq.idComputador = ca.fkComputador
where maq.fkEmpresa = 1;

-- quantidade de alertas por componente em cada equipe 
create or replace view view_alertasComponenteEquipe as
select co.nome, count(idAlerta), maq.fkEquipe from alerta a
join captura ca on ca.idCaptura = a.fkCaptura
join componente co on co.idComponente = ca.fkComponente
join computador maq on maq.idComputador = ca.fkComputador
where 
-- co.idComponente = 2 and 
maq.fkEmpresa = 1 and maq.fkEquipe = 1
group by co.idComponente, maq.fkEquipe;

-- gráfico em tempo real: uso de CPU
create or replace view view_cpuTempoReal as
select captura, time(dataCaptura) as dataCaptura, modelo
from captura
where fkComponente = 4 and fkComputador = 1 and fkAuxComponente = 12 order by dataCaptura limit 100;

-- gráfico em tempo real: uso de Disco e total
create or replace view view_discoTempoReal as
select 
    (select captura from captura 
     where fkComponente = 3 and fkComputador = 1 and fkAuxComponente = 11 
     limit 1) as captura,
    time(dataCaptura) as dataCaptura, modelo
from captura 
where fkComponente = 3 and fkComputador = 1 and fkAuxComponente = 11 
order by idCaptura limit 100;

select * from view_discoTempoReal;

-- gráfico em tempo real: rede - pacotes enviados e recebidos 
create or replace view view_redeTempoReal as
select 
    (select captura from captura 
     where fkComponente = 1 and fkComputador = 1 and fkAuxComponente = 4
     limit 1) as pctRec,
    captura as pctEnv, 
    time(dataCaptura) as dataCaptura, modelo
from captura
where fkComponente = 1 and fkComputador = 1 and fkAuxComponente = 5
order by idCaptura limit 100;

-- gráfico em tempo real: uso de memória ram
create or replace view view_ramTempoReal as
select 
    (select captura from captura 
     where fkComponente = 2 and fkComputador = 1 and fkAuxComponente = 7 
     limit 1) as captura,
    captura, 
    time(dataCaptura) as dataCaptura, modelo 
from captura 
where fkComponente = 2 and fkComputador = 1 and fkAuxComponente = 6 
order by idCaptura limit 100;

-- comandos ---------------------------------------------
desc captura;
select * from alerta;
select * from componente;
select * from captura where modelo like "%";
select fkComputador, fkEquipe, modelo.nome as modelo, funcionario.nome from modelo 
join funcionario on modelo.fkFuncionario = funcionario.idFuncionario 
where funcionario.fkEmpresa = 1;

select * from captura order by idCaptura desc limit 10;

desc captura;
select * from componente;

select * from view_cpuTempoReal limit 1;
select * from view_redeTempoReal;
select * from componente;

-- -------------------------------------------------------------------------------------------------------------------



