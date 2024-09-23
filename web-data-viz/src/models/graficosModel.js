var database = require("../database/config");

function enviar(tema, titulo, texto, fkUsuario) {
  // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", tema, titulo, texto, fkUsuario)
  var instrucaoSql = `
        insert into post (tema, titulo, texto, fkusuario) values 
        ('${tema}','${titulo}','${texto}', ${fkUsuario});
    `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarPosts() {
  // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
  var instrucaoSql = `
    select * from post 
    join usuario on usuario.idusuario = post.fkusuario 
    join perfil on usuario.idusuario = perfil.fkusuario 
    join imagemperfil on perfil.fkimagem = imagemperfil.idimagemperfil
    order by post.datahora desc;
    `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarMeusPosts(idusuario) {
  // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idusuario)
  var instrucaoSql = `
    select * from post 
    join usuario on usuario.idusuario = post.fkusuario 
    join perfil on usuario.idusuario = perfil.fkusuario 
    join imagemperfil on perfil.fkimagem = imagemperfil.idimagemperfil
    where post.fkusuario = ${idusuario}
    order by post.datahora desc
    ;
    `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function postsDia() {
  var instrucaoSql = `select date_format(datahora, "%d/%m/%Y") as dia, count(idpost) as qtd from post group by date_format(datahora, "%d/%m/%Y") order by date_format(datahora, "%d/%m/%Y");`;
  // console.log(`(graficosModel.js).postsData(): ${instrucaoSql}`);
  return database.executar(instrucaoSql);
}

function postsDiaUsuario(id) {
  var instrucaoSql = `select date_format(datahora, "%d/%m/%Y") as dia, count(idpost) as qtd from post where fkusuario = ${id} group by date_format(datahora, "%d/%m/%Y") order by date_format(datahora, "%d/%m/%Y");`;
  // console.log(`(graficosModel.js).postsDiaUsuario(): ${instrucaoSql}`);
  return database.executar(instrucaoSql);
}

function pontuacaoDiaUsuario(id) {
  var instrucaoSql = `select date_format(datahora, "%d/%m/%Y") as "dia", sum(pontuacao) as "qtd" from pontuacao where fkusuario = ${id} group by date_format(datahora, "%d/%m/%Y") order by date_format(datahora, "%d/%m/%Y");`;
  // console.log(`(graficosModel.js).pontuacaoDiaUsuario(): ${instrucaoSql}`);
  return database.executar(instrucaoSql);
}

function jogosDia() {
  var instrucaoSql = `select date_format(datahora, "%d/%m/%Y") as dia, count(idpontuacao) as qtd from pontuacao group by date_format(datahora, "%d/%m/%Y") order by date_format(datahora, "%d/%m/%Y");`;
  // console.log(`(graficosModel.js).postsData(): ${instrucaoSql}`);
  return database.executar(instrucaoSql);
}

function popularidadeVocaloid() {
  var instrucaoSql = `select nomeVocaloid, count(fkvocaloid) as qtd from perfil join vocaloid on vocaloid.idvocaloid = perfil.fkvocaloid group by nomeVocaloid;`;
  // console.log(`(graficosModel.js).postsData(): ${instrucaoSql}`);
  return database.executar(instrucaoSql);
}

function popularidadeTema() {
  var instrucaoSql = `select tema, count(idpost) as qtd from post group by tema;`;
  // console.log(`(graficosModel.js).postsData(): ${instrucaoSql}`);
  return database.executar(instrucaoSql);
}

module.exports = {
  enviar,
  listarPosts,
  listarMeusPosts,
  postsDia,
  jogosDia,
  postsDiaUsuario,
  pontuacaoDiaUsuario,
  popularidadeVocaloid,
  popularidadeTema,
};
