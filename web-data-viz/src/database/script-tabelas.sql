-- nome: ilys gomes maroto
-- ra: 04241067
-- criação do banco de dados para o projeto individual

-- [...]
drop database if exists 39talk;
create database 39talk;
use 39talk;

create table vocaloid (
idvocaloid int primary key auto_increment,
nome varchar(256)
);

insert into vocaloid (nome) values
('hatsune miku'),
('kaito'),
('meiko'),
('megurine luka'),
('kagamine len'),
('kagamine rin');

create table imagemperfil (
idimagemperfil int primary key auto_increment,
imagem varchar(256)
); 
-- [...]

insert into imagemperfil (imagem) values
('../assets/icon/mikuicon.jpg'),
('../assets/icon/kaitoicon.jpg'),
('../assets/icon/meikoicon.jpg'),
('../assets/icon/lukaicon.jpg'),
('../assets/icon/lenicon.jpg'),
('../assets/icon/rinicon.jpg');

create table genero(
idgenero int primary key auto_increment,
genero varchar(256)
);

insert into genero(genero) values
('masculino'),
('feminino');

create table conhecimento(
idconhecimento int primary key auto_increment,
como varchar(256)
);

insert into conhecimento(como) values
('amigos'),
('internet'),
('familiares'),
('jogos'),
('trabalho'),
('outro');

create table atuacao(
idatuacao int primary key auto_increment,
atuacao varchar(256)
);

create table usuario(
idusuario int primary key auto_increment,
nome varchar(256),
email varchar(256) unique,
senha varchar(256),
nasc date,
fkatuacao int,
fkconhecimento int,
fkgenero int,

foreign key (fkatuacao) references atuacao(idatuacao),
foreign key (fkconhecimento) references conhecimento(idconhecimento),
foreign key (fkgenero) references genero(idgenero)
);

insert into usuario (nome, email, senha, nasc, fkatuacao, fkconhecimento, fkgenero) values
('teste', 'teste', 'teste', '2020-01-01', null, 1, 1);
select * from usuario;

create table jogo(
idjogo int primary key auto_increment,
nome varchar(256)
);

create table pontuacao (
idpontuacao int auto_increment,
fkjogo int,
fkusuario int,
pontuacao int,
vezesjogadas int,

primary key (idpontuacao, fkjogo, fkusuario),
foreign key (fkjogo) references jogo(idjogo),
foreign key (fkusuario) references usuario(idusuario)
);

create table perfil (
idperfil int auto_increment,
apelido varchar(256),
fkusuario int,
fkimagem int,
fkvocaloid int,

primary key (idperfil, fkusuario),
foreign key (fkusuario) references usuario(idusuario),
foreign key (fkimagem) references imagemperfil(idimagemperfil),
foreign key (fkvocaloid) references vocaloid(idvocaloid)
);

create table mensagem(
idmensagem int auto_increment,
mensagem varchar(256),
datahora datetime,
fkusuario int,

primary key (idmensagem, fkusuario),
foreign key (fkusuario) references usuario(idusuario)
);

create table post(
idpost int,
titulo varchar(256),
texto varchar(256),
imagem varchar(256),
datahora datetime,
fkusuario int,

primary key (idpost, fkusuario),
foreign key (fkusuario) references usuario(idusuario)
);
