-- nome: ilys gomes maroto
-- ra: 04241067
-- criação do banco de dados para o projeto individual

drop database if exists 39talk;
create database 39talk;
use 39talk;

create table vocaloid (
idvocaloid int primary key auto_increment,
nomevocaloid varchar(256),
cortema varchar(256)
);

insert into vocaloid (nomevocaloid, cortema) values
('Meiko', '#DE4444'), 
('Kaito', '#3367CD'), 
('Hatsune Miku', '#33CCBA'),
('Kagamine Rin', '#fdc600'), 
('Kagamine Len', '#FFEE12'), 
('Megurine Luka','#FFBACC'); 

create table imagemperfil (
idimagemperfil int primary key auto_increment,
nomeimagem varchar(256),
imagem varchar(256)
); 

insert into imagemperfil (nomeimagem, imagem) values
( 'MeikoIcon','../assets/icon/meikoicon.jpg'),
( 'KaitoIcon' ,'../assets/icon/kaitoicon.jpg'),
( 'MikuIcon' ,'../assets/icon/mikuicon.jpg'),
( 'RinIcon' ,'../assets/icon/rinicon.jpg'),
( 'LenIcon' ,'../assets/icon/lenicon.jpg'),
( 'LukaIcon' ,'../assets/icon/lukaicon.jpg');

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
('Amigos'),
('Internet'),
('Familiares'),
('Jogos'),
('Trabalho'),
('Outro');

create table atuacao(
idatuacao int primary key auto_increment,
atuacao varchar(256)
);

insert into atuacao(atuacao) values
('Fã'),
('Produtor de Conteúdo'),
('Produtor de Música'),
('Jogador'),
('Artista'),
('Cosplayer'),
('Outro');

create table usuario(
idusuario int primary key auto_increment,
nome varchar(256),
email varchar(256) unique,
senha varchar(256),
nasc date,
fkconhecimento int,
fkgenero int,

foreign key (fkconhecimento) references conhecimento(idconhecimento),
foreign key (fkgenero) references genero(idgenero)
);

insert into usuario (nome, email, senha, nasc, fkconhecimento, fkgenero) values
('teste', 'teste', 'teste', '2020-01-01', 1, 1);
select * from usuario;

create table jogo(
idjogo int primary key auto_increment,
nomejogo varchar(256)
);

insert into jogo(nomejogo) values
('Jogo da Velha'),
('Jogo da Memória');

create table pontuacao (
idpontuacao int auto_increment,
fkjogo int,
fkusuario int,
pontuacao int,
vezesjogadas int,
datahora datetime,

primary key (idpontuacao, fkjogo, fkusuario),
foreign key (fkjogo) references jogo(idjogo),
foreign key (fkusuario) references usuario(idusuario)
);


create table perfil (
idperfil int auto_increment,
apelido varchar(256),
resumo varchar(256),
gosto varchar(256),
sobre varchar(256),
fkusuario int,
fkimagem int,
fkvocaloid int,
fkatuacao int,

primary key (idperfil, fkusuario),

foreign key (fkusuario) references usuario(idusuario),
foreign key (fkimagem) references imagemperfil(idimagemperfil),
foreign key (fkvocaloid) references vocaloid(idvocaloid),
foreign key (fkatuacao) references atuacao(idatuacao)
);

-- EXCLUIR MENSAGEM
-- create table mensagem(
-- idmensagem int auto_increment,
-- mensagem varchar(256),
-- datahora datetime,
-- fkusuario int,

-- primary key (idmensagem, fkusuario),
-- foreign key (fkusuario) references usuario(idusuario)
-- );

create table post(
idpost int,
tema varchar(256),
titulo varchar(256),
texto varchar(256),
datahora datetime,
fkusuario int,

primary key (idpost, fkusuario),
foreign key (fkusuario) references usuario(idusuario)
);
