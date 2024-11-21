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
(default,"memória"),
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
(default,"pacoteEnviados","qte", 1),
(default,"pacoteEnviados","qte", 1),
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
("Jeffinho", "Jeffinho.botafogo@gmail.com", "5511941159059" , MD5("123456"), 1, 1, 1);

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
tipoAlerta TINYINT(1) DEFAULT 1, -- default 1(alerta amarelo) ou 2(alerta vermelho) 
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

CREATE TABLE IF NOT EXISTS chamada(
idChamada int primary key auto_increment,
chamadaRecebida int,
chamadaAtendida INT,
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


-- --------------------------------------------------------------- TESTES & DESENVOLVIMENTO --------------------------------------------------
insert into funcionario values
(default, "teste", "teste@gmail.com", "11956782706", MD5("Aa1!"), 1,1, null, 1);

insert into funcionario (idFuncionario, nome, email, telefone, fkEmpresa, fkEquipe, fkCargo) values
(3, "Ana Clara", "anaclara@gmail.com", "11956782736", 1, 1, 4),
(4, "Júlio Cesar", "julio@gmail.com", "11956781234", 1, 1, 4),
(5, "Beatriz Angola", "bea@gmail.com", "11951234736", 1, 1, 4),
(6, "Sérgio Lucas", "sergio@gmail.com", "11990082736", 1, 1, 4);

insert into computador (fkEquipe, fkEmpresa, fkFuncionario) values
(1, 1, 3),
(1, 1, 4),
(1, 1, 5),
(1, 1, 6);

INSERT INTO alerta (fkCaptura, tipoAlerta) VALUES 
(1, 1), -- alerta pra maquina 1
(22, 2), -- alerta pra maquina 1
(66, 1), -- alerta pra maquina 3
(97, 2); -- alerta pra maquina 4

desc alerta;
truncate table alerta;
select * from alerta join captura on captura.idCaptura = alerta.fkCaptura;
desc captura;
select idCaptura from captura where captura = 80 AND dataCaptura = agora AND fkComponente = 2;
select * from captura where fkComputador = 4 order by idCaptura desc limit 3;

-- --------------------------- VIEWS - TELA DE DISPOSITIVOS --------------------------------------------------------------------------------
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

-- --------------------------- quantidade de alertas por componente em cada equipe 
create or replace view view_alertasComponenteEquipe as
select co.nome, count(idAlerta), maq.fkEquipe from alerta a
join captura ca on ca.idCaptura = a.fkCaptura
join componente co on co.idComponente = ca.fkComponente
join computador maq on maq.idComputador = ca.fkComputador
where maq.fkEmpresa = 1
group by co.idComponente, maq.fkEquipe;

select * from view_alertasComponenteEquipe;

-- --------------------------- listagem das máquinas
CREATE OR REPLACE VIEW view_listarMaquinas AS SELECT 
c.idComputador, c.status, c.fkEquipe, c.fkEmpresa, c.fkFuncionario,
f.nome AS nomeFuncionario,
e.nome AS nomeEquipe
FROM computador c
JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
JOIN equipe e ON c.fkEquipe = e.idEquipe where f.fkCargo = 4 order by status;

-- na model
select * from view_listarMaquinas where fkEmpresa = 1;


-- ------------------------------------- listagem das máquinas com os alertas
create or replace view view_listarMaquinasComAlertas as select
c.idComputador, c.status, c.fkEquipe, c.fkEmpresa, c.fkFuncionario,
f.nome as nomeFuncionario,
e.nome as nomeEquipe,
captura.idAlerta AS ultimoAlerta,
MAX(captura.dataCaptura) AS dataUltimoAlerta
from computador c
join funcionario f on c.fkFuncionario = f.idFuncionario
join equipe e on c.fkEquipe = e.idEquipe
left join (select al.idAlerta, c.fkComponente, c.dataCaptura from alerta al join captura c on al.fkCaptura = c.idCaptura) captura on captura.fkComponente = c.idComputador
where f.fkCargo = 4
group by c.idComputador, c.status, c.fkEquipe, c.fkEmpresa, c.fkFuncionario, f.nome, e.nome, captura.idAlerta
order by c.status desc, dataUltimoAlerta desc;

select * from view_listarMaquinasComAlertas;

-- --------------------------- gráfico em tempo real: uso de CPU
create or replace view view_cpuTempoReal as
select ca.captura, time(ca.dataCaptura) as dataCaptura, ca.modelo
from captura ca
where ca.fkComponente = 4 and ca.fkComputador = 1 and ca.fkAuxComponente = 12 order by dataCaptura limit 100;

-- gráfico em tempo real: uso de Disco e total
select captura, time(dataCaptura) as dataCaptura, modelo
from captura
where fkComponente = 4 and fkComputador = 1 and fkAuxComponente = 12 order by dataCaptura limit 100;

-- --------------------------- gráfico em tempo real: uso de Disco e total
create or replace view view_discoTempoReal as
select captura, time(dataCaptura) as dataCaptura, modelo
from captura 
where fkComponente = 3 and fkComputador = 1 and fkAuxComponente = 11 
order by idCaptura limit 100;

-- --------------------------- gráfico em tempo real: rede - pacotes enviados e recebidos 
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

-- --------------------------- gráfico em tempo real: uso de memória ram
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

-- na model
select * from view_ramTempoReal where fkEmpresa = 1;
-- --------------------------- verifica se a máquina tem alerta pra exibir na listagem(o menu lateral de listagem de maquinas em alerta vai ser parecido)
create or replace view view_alertaMaquina as
select c.captura, time(c.dataCaptura) as horario, date(c.dataCaptura) as data, 
comp.nome, 
aux.unidadeMedida, 
maq.idComputador, maq.fkEquipe, maq.fkEmpresa,
al.idAlerta
from alerta al
left join captura c on al.fkCaptura = c.idCaptura
left join componente comp on c.fkComponente = comp.idComponente
left join auxcomponente aux on aux.idAuxComponente = c.fkAuxComponente
left join computador maq on maq.idComputador = c.fkComponente;
-- na model
select * from view_alertaMaquina where fkEmpresa = 1;

-- ----------------------------------------------------------------   comandos ----------------------------------------------------------------
desc captura;
select * from alerta;
select * from auxComponente;
desc captura;
select * from componente;
select * from view_cpuTempoReal limit 1;
select * from view_cpuTempoReal;
select * from componente;
select round(avg(captura),0) as media from view_cpuTempoReal;
select * from componente;
select * from captura where modelo like "%";

select modelo, fkComputador, equipe.nome from captura join computador as c on c.idComputador = captura.fkComputador join equipe on equipe.idEquipe = c.fkEquipe
 WHERE equipe.fkEmpresa = 1 AND captura.fkComponente = 3;
 
 select * from alerta;
 select * from captura;
 select * from computador;
 

select * from captura order by idCaptura desc limit 10;
select * from alerta;
desc captura;
select * from componente;
select * from view_cpuTempoReal limit 1;
select * from view_redeTempoReal;
select * from componente;

select * from alerta;

select idCaptura, c.captura, comp.nome, aux.unidadeMedida
from captura c
join componente comp on c.fkComponente = comp.idComponente
join auxcomponente aux on comp.idComponente = aux.fkComponente
where idCaptura = 1;

-- -------------------------------------------------------------------------------------------------------------------

select * from chamada;
select * from funcionario;

select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura where fkComponente = 4; 
select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura where fkComputador = 1; -- esse vai estar no data tables
select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura; -- esse pode estar na primeira página
 
SELECT COUNT(DISTINCT fkComputador) AS quantidade_maquinas_com_alertas
FROM alerta AS a
JOIN captura AS c ON a.fkCaptura = c.idCaptura; -- conta o numero de computadores que contém alertas

 
 
 
 insert into alerta values
 (default, 3),
 (default, 1),
 (default, 4);
 

-- --------------------------------------------------------------------------------------------------------------------
