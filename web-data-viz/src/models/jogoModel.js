var database = require("../database/config");

// FUNÇÃO para salvar a pontuação e o tempo do jogo da memoria
function salvarMemoria(fkjogo, fkUsuario, pontuacao, tempojogado) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkjogo, fkUsuario, pontuacao, tempojogado);
  var instrucaoSql = `
            insert into pontuacao (fkjogo, fkusuario, pontuacao, tempojogado) values (${fkjogo},${fkUsuario},${pontuacao},'${tempojogado}')
        `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  salvarMemoria,
};
