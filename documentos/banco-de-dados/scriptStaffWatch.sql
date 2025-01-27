CREATE DATABASE IF NOT EXISTS StaffWatch;
USE StaffWatch;
-- DROP DATABASE Staffwatch;

  SELECT captura, dataCaptura FROM captura WHERE fkAuxComponente = 26;

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
(default,"tempoAtividadeLooca","segundos", 5),

-- insert into auxComponente values
(default,"latencia", "ms", 1), -- é o tempoRespostaPing3 antigo | id atual = 20
(default,"pacotesPerdidos", "%",1), -- é o perdaPacotesPing3 antigo | id atual= 21
(default,"latenciaLeituras","ms",3),
(default,"latenciaEscritas","ms",3),
(default,"throughputLidos","qte",3),
(default,"throughputEscritos","qte",3),
(default,"tempoFalhas","segundos",1), -- é o tempoFalhasPing3 antigo | manteve o ID
(default,"inatividade","horas",1), -- é o inatividadePing3 antigo | manteve o ID
(default,"trafegoRede","MB",1); -- é o trafegoRede antigo | manteve o ID

select * from auxComponente;

CREATE TABLE IF NOT EXISTS empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(18),
nomeEmp VARCHAR(45)
);

select * from auxComponente;

insert into empresa (idEmpresa, cnpj, nomeEmp) values
(default, "123456789123456789", "CentralLink");


CREATE TABLE IF NOT EXISTS equipe (
idEquipe INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
setor VARCHAR(45),
fkEmpresa int,
constraint fkEmpresaEquipe foreign key(fkEmpresa)
references empresa(idEmpresa)
);

insert into equipe values
(default, "Liga Rápido", "atendimento", 1),
(default, "Desenvolve", "desenvolvimento", 1);

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
("Guilherme", "guilherme@gmail.com", "5511941159059" , MD5("123456"), 1, 1, 1),
("Matheus Souza", "matheus@gmail.com", "5511989715713" , MD5("123456"), 1, 1, 2),
("Lilia Greco", "lilia@gmail.com", "5511958016310" , MD5("123456"), 1, 1, 3);

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
dataCaptura DATETIME,


fkFuncionario INT,
CONSTRAINT funcionarioChamada FOREIGN KEY(fkFuncionario)
REFERENCES funcionario(idFuncionario),

fkEmpresa INT,
CONSTRAINT empresaChamada FOREIGN KEY(fkEmpresa)
REFERENCES empresa(idEmpresa)
);

-- --------------------------------------------------------------- TESTES & DESENVOLVIMENTO --------------------------------------------------

-- --------------------------------------------------------------- TESTES & DESENVOLVIMENTO  - Izabelle --------------------------------------------------

insert into equipe values
(default, 'Product center', 'produto', 1),
(default,'suport ', 'suporte', 1),
(default,'commerce', 'comercial', 1);

insert into funcionario (idFuncionario, nome, email, telefone, fkEmpresa, fkEquipe, fkCargo) values
(default, "Ana Clara", "anaclara@gmail.com", "5511959847881", 1, 1, 4),
(default, "Júlio Cesar", "julio@gmail.com", "5511946275868", 1, 3, 4),
(default, "Beatriz Angola", "bea@gmail.com", "5511940352230", 1, 4, 4);


insert into computador (fkEquipe, fkEmpresa, fkFuncionario) values
(1, 1, 3),
(3, 1, 4),
(4, 1, 5),
(1, 1, 6),
(2, 1, 1);

-- --------------------------- SELECTS - TELA DE DISPOSITIVOS --------------------------------------------------------------------------------

-- --------------------------- quantidade de alertas por componente em cada equipe 
create or replace view view_alertasComponenteEquipe as
select maq.fkEquipe as equipe, co.nome as componente, count(a.idAlerta) as qtdAlerta 
from componente co 
left join captura ca on ca.fkComponente = co.idComponente 
left join alerta a on a.fkCaptura = ca.idCaptura 
left join computador maq on maq.idComputador = ca.fkComputador 
where maq.fkEmpresa = 1 
group by maq.fkEquipe, co.nome order by maq.fkEquipe, co.nome;

select * from view_alertasComponenteEquipe;

-- --------------------------- listagem das máquinas -  sem alertas
SELECT 
c.idComputador, c.status, c.fkEquipe, c.fkEmpresa, c.fkFuncionario,
f.nome AS nomeFuncionario,
e.nome AS nomeEquipe
FROM computador c
JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
JOIN equipe e ON c.fkEquipe = e.idEquipe where f.fkCargo = 4 order by status;

-- ------------------------------------- listagem das máquinas - com alertas
select 
c.idComputador, c.status, c.fkEquipe, c.fkFuncionario, 
f.nome as nomeFuncionario, 
e.nome as nomeEquipe, 
a.tipoAlerta, 
cap.dataCaptura, cap.captura, 
aux.idAuxComponente, aux.unidadeMedida, 
co.nome as nomeComponente 
from computador c 
join funcionario f on c.fkFuncionario = f.idFuncionario 
join equipe e on c.fkEquipe = e.idEquipe 
left join (
    select 
        a1.idAlerta, 
        a1.tipoAlerta, 
        a1.fkCaptura 
    from alerta a1 
    inner join (
        select 
            cap.fkComputador, 
            max(a.idAlerta) as ultimoAlerta 
        from alerta a 
        join captura cap on cap.idCaptura = a.fkCaptura where dataCaptura >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
        group by cap.fkComputador
    ) ultimosAlertas on a1.idAlerta = ultimosAlertas.ultimoAlerta
) a on exists (
    select 1 
    from captura cap2 
    where cap2.idCaptura = a.fkCaptura 
    and cap2.fkComputador = c.idComputador
) 
left join captura cap on cap.idCaptura = a.fkCaptura 
left join componente co on co.idComponente = cap.fkComponente 
left join auxComponente aux on aux.idAuxComponente = cap.fkAuxComponente 
where f.fkCargo = 4
order by c.status, cap.dataCaptura desc;
-- --------------------------- gráfico em tempo real: uso de CPU
select ca.captura, time(ca.dataCaptura) as dataCaptura, ca.modelo, ca.fkComputador, co.fkEmpresa
from captura ca
join computador co on ca.fkComputador = co.idComputador
where ca.fkComponente = 4 and ca.fkAuxComponente = 12 
order by dataCaptura limit 100;



select * from captura where fkAuxComponente = 12;

select ca.captura, time(ca.dataCaptura) as dataCaptura, ca.modelo, fkComputador, fkEmpresa, dataCaptura as dt, idCaptura
                        from captura ca
                        join computador co on ca.fkComputador = co.idComputador
                        where ca.fkComponente = 4 and ca.fkAuxComponente = 12 and
                        fkEmpresa = 1 and fkComputador = 2
                        order by dt desc limit 1;


-- em tempo real (ta adaptado na model pra todos)------------------------------
select ca.captura, time(ca.dataCaptura) as dataCaptura, ca.modelo, fkComputador, fkEmpresa
from captura ca
join computador co on ca.fkComputador = co.idComputador
where ca.fkComponente = 4 and ca.fkAuxComponente = 12 and fkEmpresa = 1 and fkComputador = 3
order by dataCaptura desc limit 1;


-- --------------------------- gráfico em tempo real: uso de Disco e total
select captura, time(dataCaptura) as dataCaptura, modelo, fkComputador, fkEmpresa
from captura 
join computador co on captura.fkComputador = co.idComputador
where fkComponente = 3 and fkAuxComponente = 11
order by idCaptura limit 100;

-- --------------------------- gráfico em tempo real: rede - pacotes enviados e recebidos 
create or replace view view_redeTempoReal as
select 
    (select captura from captura 
     where fkComponente = 1 and fkAuxComponente = 20
     limit 1) as latencia,
    captura as pctPerd, 
    time(dataCaptura) as dataCaptura, modelo, fkComputador, fkEmpresa
from captura
join computador co on captura.fkComputador = co.idComputador
where fkComponente = 1 and fkAuxComponente = 21
order by idCaptura limit 100;

-- --------------------------- gráfico em tempo real: uso de memória ram
select 
captura, time(dataCaptura) as dataCaptura, modelo, fkComputador, fkEmpresa
from captura 
join computador co on captura.fkComputador = co.idComputador
where fkComponente = 2 and fkAuxComponente = 6 
order by idCaptura limit 100;


-- na model

-- --------------------------- gráfico barras: qtd de alertas em cada componente por equipe
select maq.fkEquipe as equipe, co.nome as componente, count(a.idAlerta) as qtdAlerta 
from componente co 
left join captura ca on ca.fkComponente = co.idComponente 
left join alerta a on a.fkCaptura = ca.idCaptura 
left join computador maq on maq.idComputador = ca.fkComputador 
where maq.fkEmpresa = 1 
group by maq.fkEquipe, co.nome 
order by maq.fkEquipe, co.nome;

-- -------------------------------------------------------------------------------   comandos e testes --------------------------------------------------------------------------------
 select alerta.*, captura.* from alerta join captura on captura.idCaptura = alerta.fkCaptura order by idAlerta desc limit 4;

-- teste de filtro por ano
update captura set dataCaptura = '2023-12-01 11:53:28' where idCaptura = 2047; 

-- teste de filtro por semana
update captura set dataCaptura = '2024-11-23 11:53:28' where idCaptura = 2030;

-- teste de filtro por dia
update captura set dataCaptura = '2024-11-30 11:53:28' where idCaptura = 2014;

-- teste de filtro por mes
update captura set dataCaptura = '2024-10-31 11:53:28' where idCaptura = 1998;


-- --------------------------- SELECTS - TELAS DE COMPONENTES - Matheus --------------------------------------------------------------------------------

select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura where fkComponente = 4; 
select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura where fkComputador = 1; -- esse vai estar no data tables
select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura; -- esse pode estar na primeira página


select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura where fkComponente = 1;
 
SELECT COUNT(DISTINCT fkComputador) AS quantidade_maquinas_com_alertas
FROM alerta AS a
JOIN captura AS c ON a.fkCaptura = c.idCaptura where fkComponente = 1; -- conta o numero de computadores que contém alertas


 
 select * from componente;
 
 
 select * from captura where fkComponente = 3;

select * from captura where fkComponente = 3;


select modelo, fkComputador, equipe.nome from captura join computador as c on c.idComputador = captura.fkComputador join equipe on equipe.idEquipe = c.fkEquipe
 WHERE equipe.fkEmpresa = 1 AND captura.fkComponente = 4; 
 
 select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura where fkComputador = 1;
 select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura where fkComponente = 1;
 
SELECT 
    captura.modelo,
    captura.fkComputador,
    equipe.nome,
    COUNT(alerta.idAlerta) AS quantidade_alertas
FROM 
    captura
JOIN 
    computador AS c ON c.idComputador = captura.fkComputador
JOIN 
    equipe ON equipe.idEquipe = c.fkEquipe
LEFT JOIN 
    alerta ON alerta.fkCaptura = captura.idCaptura
WHERE 
    equipe.fkEmpresa = 1 
    AND captura.fkComponente = 4
GROUP BY 
    captura.modelo, captura.fkComputador, equipe.nome;


SELECT 
    captura.fkComputador AS idComputador,
    CASE 
        WHEN captura.fkComponente = 1 THEN 
            CONCAT(COUNT(alerta.idAlerta), ' alertas relacionados à Rede na máquina ', captura.fkComputador)
        WHEN captura.fkComponente = 2 THEN 
            CONCAT(COUNT(alerta.idAlerta), ' alertas relacionados à Memória na máquina ', captura.fkComputador)
        WHEN captura.fkComponente = 3 THEN 
            CONCAT(COUNT(alerta.idAlerta), ' alertas relacionados ao Disco na máquina ', captura.fkComputador)
        WHEN captura.fkComponente = 4 THEN 
            CONCAT(COUNT(alerta.idAlerta), ' alertas relacionados à CPU na máquina ', captura.fkComputador)
        ELSE 
            CONCAT(COUNT(alerta.idAlerta), ' alertas de componente desconhecido na máquina ', captura.fkComputador)
    END AS mensagemAlerta
FROM 
    alerta
JOIN 
    captura ON alerta.fkCaptura = captura.idCaptura
GROUP BY 
    captura.fkComputador, captura.fkComponente
ORDER BY 
    captura.fkComputador;

-- --------------------------------------------------------------------------------------------------------------------
