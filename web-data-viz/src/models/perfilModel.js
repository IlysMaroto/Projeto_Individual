// const { listarPerfil } = require("../controllers/perfilController");
var database = require("../database/config");

// FUNÇÃO para verificar o usuario logado
function verificar(idusuario) {
  // console.log("ID: " + idusuario)

  var instrucaoSql = `
        SELECT 
            perfil.*, imagemperfil.imagem, vocaloid.nomevocaloid, atuacao.atuacao
        FROM 
            perfil
        LEFT JOIN 
            imagemperfil
            ON perfil.fkimagem = imagemperfil.idimagemperfil
        LEFT JOIN
			vocaloid
            ON perfil.fkvocaloid = vocaloid.idvocaloid
		LEFT JOIN
        atuacao
            ON perfil.fkatuacao = atuacao.idatuacao
        WHERE 
            fkusuario = ${idusuario};
    `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// FUNÇÃO para atualizar o perfil
function atualizar(apelido, resumo, gosto, sobre, fkvocaloid, fkatuacao, fkimagem, idUser) {
  var instrucaoSql = `
        UPDATE PERFIL
        SET apelido = '${apelido}',
            resumo = '${resumo}',
            gosto = '${gosto}',
            sobre = '${sobre}',
            fkusuario = '${idUser}',
            fkvocaloid = '${fkvocaloid}',
            fkatuacao = '${fkatuacao}',
            fkimagem = '${fkimagem}'
        WHERE idperfil = ${idUser};
        `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarPerfis() {
  // console.log("ACESSEI O PERFIL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
  var instrucaoSql = `
    select * from perfil 
    join usuario on usuario.idusuario = perfil.fkusuario 
    join imagemperfil on perfil.fkimagem = imagemperfil.idimagemperfil;
    `;
  // console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  verificar,
  atualizar,
  listarPerfis,
};
