var database = require("../database/config")

function verificar(idusuario) {
    console.log("ID: " + idusuario)

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
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// // Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
// function cadastrar(nome, email, senha, nasc, fkconhecimento, fkgenero, vocaloid) {
//     console.log(
//         `ACESSEI O USUARIO MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():`, nome, email, senha
//     );
    
//     // são 2 inserts
//     // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
//     //  e na ordem de inserção dos dados.
//     var instruSelVocal = `
//     `

//     var instrucaoSql = `
//         INSERT INTO USUARIO (nome, email, senha, nasc, fkconhecimento, fkgenero) VALUES ('${nome}', '${email}', '${senha}', '${nasc}', '${fkconhecimento}', '${fkgenero}');
//     `;

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

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
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    verificar,
    atualizar,
};
