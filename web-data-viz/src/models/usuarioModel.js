var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
async function cadastrar(nome, email, senha, nasc, fkconhecimento, fkgenero, vocaloid, apelido, resumo, gosto, sobre, fkimagem, fkatuacao) {
    console.log(
        `ACESSEI O USUARIO MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():`, nome, email, senha
    );

    var inst00 = `
        SELECT count(*) AS count FROM USUARIO WHERE email = '${email}'
    `

    console.log("Executando a instrução SQL: \n" + inst00);
    const emailCheckResult = await database.executar(inst00);
    const emailCount = emailCheckResult[0].count;
    console.log(emailCheckResult[0].count)

    if (emailCount > 0) {
        console.error("Erro: Email já cadastrado.");
        return;
    }

    var instrucaoSql01 = `
        INSERT INTO USUARIO (nome, email, senha, nasc, fkconhecimento, fkgenero) VALUES ('${nome}', '${email}', '${senha}', '${nasc}', '${fkconhecimento}', '${fkgenero}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql01);
    database.executar(instrucaoSql01)

    // COALESCE para lidar com valores nulos
    var instrucaoSql02 = `
        SELECT COALESCE(MAX(idusuario)+1, 1) AS idusuario FROM USUARIO;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql02);
    const result = await database.executar(instrucaoSql02);
    const idusuario = result[0].idusuario;

    var instrucaoSql03 = `
        INSERT INTO PERFIL (apelido, resumo, gosto, sobre, fkusuario, fkimagem, fkvocaloid, fkatuacao) VALUES ('${apelido}', 'Escreva sua Bio aqui!', 'Fale um pouco dos seus gostos aqui!', 'Fale um pouco sobre o você', ${idusuario}, ${fkimagem}, ${vocaloid}, ${fkatuacao});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql03);
    return database.executar(instrucaoSql03);
}

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT u.idusuario as idusuario, u.nome as nome, u.email as email, u.senha as senha, p.apelido, i.imagem FROM USUARIO as u 
        join perfil as p on u.idusuario = p.fkusuario 
        JOIN imagemperfil as i on p.fkimagem = i.idimagemperfil
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUsuarios() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
    select * from usuario 
    join perfil on usuario.idusuario = perfil.fkusuario 
    join imagemperfil on perfil.fkimagem = imagemperfil.idimagemperfil;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listarUsuarios,
};