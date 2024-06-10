-- NOME: ILYS GOMES MAROTO
-- RA: 04241067
-- CRIAÇÃO DO BANCO DE DADOS PARA O PROJETO INDIVIDUAL

DROP DATABASE IF EXISTS 39TALK;
CREATE DATABASE 39TALK;
USE 39TALK;

CREATE TABLE VOCALOIDFAVORITO (
  IDVOCALOID INT PRIMARY KEY auto_increment,
  NOME VARCHAR(256)
);

CREATE TABLE IMAGEMPERFIL (
  IDIMAGEM INT PRIMARY KEY auto_increment,
  IMAGEM VARCHAR(256)
);

CREATE TABLE USUARIO(
  IDUSUARIO INT AUTO_INCREMENT,
  NOME VARCHAR(256),
  EMAIL VARCHAR(256) UNIQUE,
  SENHA VARCHAR(256),
  FKVOCALOID INT,
  FKIMAGEM INT,
  GENERO VARCHAR(256),

  PRIMARY KEY (IDUSUARIO, FKIMAGEM, FKVOCALOID),
  FOREIGN KEY (FKIMAGEM) REFERENCES IMAGEMPERFIL(IDIMAGEM),
  FOREIGN KEY (FKVOCALOID) REFERENCES VOCALOIDFAVORITO(IDVOCALOID)
);

CREATE TABLE JOGO(
  IDJOGO INT PRIMARY KEY AUTO_INCREMENT,
  NOME VARCHAR(256)
);

CREATE TABLE PONTUACAO (
  IDPONTUACAO INT AUTO_INCREMENT,
  FKJOGO INT,
  FKUSUARIO INT,
  PONTUACAO INT,
  VEZESJOGADAS INT,

  PRIMARY KEY (IDPONTUACAO, FKJOGO, FKUSUARIO),
  FOREIGN KEY (FKJOGO) REFERENCES JOGO(IDJOGO),
  FOREIGN KEY (FKUSUARIO) REFERENCES USUARIO(IDUSUARIO)
);

INSERT INTO VOCALOIDFAVORITO (NOME) VALUES
  ('Hatsune Miku'),
  ('Kaito'),
  ('Meiko'),
  ('Megurine Luka'),
  ('Kagamine Len'),
  ('Kagamine Rin');

INSERT INTO IMAGEMPERFIL (IMAGEM) VALUES
  ('../assets/icon/mikuicon.jpg'),
  ('../assets/icon/kaitoicon.jpg'),
  ('../assets/icon/meikoicon.jpg'),
  ('../assets/icon/lukaicon.jpg'),
  ('../assets/icon/lenicon.jpg'),
  ('../assets/icon/rinicon.jpg');
