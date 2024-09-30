-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/
create database WanoQuest;
use WanoQuest;

create table personagem (
idPersonagem int primary key auto_increment,
nome varchar(45) not null,
descricao varchar(100)
);

create table tema (
idTema int primary key auto_increment,
descricao varchar(400)
);

create table quiz (
idQuiz int primary key auto_increment,
nome varchar(45) not null,
qtdPontos int not null,
fkTema int,
foreign key (fkTema) references tema(idTema)
);

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(100) not null,
nickname varchar(15) not null unique,
email varchar(45) not null unique,
senha varchar(256) not null,
fkPersonagem int,

constraint chkEmail check (email like '%@%.com'),
foreign key (fkPersonagem) references personagem(idPersonagem)
);

create table postagem (
idPostagem int primary key auto_increment,
mensagem varchar(200),
fkUsuario int,
fkTema int,
foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkTema) references tema(idTema)
);

create table pontuacao (
fkUsuario int,
fkQuiz int,
pontos int not null,
dataPontuacao datetime,

foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkQuiz) references quiz(idQuiz),
primary key (fkUsuario, fkQuiz)
);

create table curtir (
fkUsuario int,
fkPostagem int,
dataCurtida date,

foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkPostagem) references postagem(idPostagem)
);

insert into personagem (nome) values
('Luffy'),
('Zoro'),
('Nami'),
('Usopp'),
('Sanji'),
('Chopper'),
('Robin'),
('Brook'),
('Jinbe'),
('Franky'),

('Kaido'),
('Trafalgar Law'),
('Big Mom'),

('Kozuki Oden'),
('Kozuki Hiyori'),
('Kozuki Momonosuke'),
('Kozuki Hiyori'),
('Kurozumi Orochi');