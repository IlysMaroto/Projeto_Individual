var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // console.log(req.body)
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var nasc = req.body.nascServer;
  // var fkatuacao = req.body.fkatuacaoServer;
  var fkconhecimento = req.body.fkconhecimentoServer;
  var fkgenero = req.body.fkgeneroServer;
  var vocaloid = req.body.vocaloidServer;
  var apelido = req.body.apelidoServer;
  var resumo = null;
  // 'Escreva sua Bio aqui!'
  var gosto = null;
  // 'Fale um pouco dos seus gostos aqui!'
  var sobre = null;
  // 'Fale um pouco sobre o você'
  var fkimagem = vocaloid;
  var fkatuacao = 1;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (nasc == undefined) {
    res.status(400).send("Sua nasc está undefined!");
  } else if (fkconhecimento == undefined) {
    res.status(400).send("Sua conhecimento está undefined!");
  } else if (fkgenero == undefined) {
    res.status(400).send("Seu genero está undefined!");
  } else if (vocaloid == undefined) {
    res.status(400).send("Seu vocaloid está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, email, senha, nasc, fkconhecimento, fkgenero, vocaloid, apelido, resumo, gosto, sobre, fkimagem, fkatuacao)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function verificar(req, res) {
  var idusuario = req.body.iduserServer;

  if (idusuario == undefined) {
    res.status(400).send("O ID está undefined!");
  } else {
    usuarioModel
      .verificar(idusuario)
      .then(function (resultadoVerificar) {
        res.status(200).json(resultadoVerificar);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao verificar! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        // console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        // console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          // console.log(resultadoAutenticar);

          res.json({
            idusuario: resultadoAutenticar[0].idusuario,
            email: resultadoAutenticar[0].email,
            nome: resultadoAutenticar[0].nome,
            senha: resultadoAutenticar[0].senha,
            apelido: resultadoAutenticar[0].apelido,
            imagem: resultadoAutenticar[0].imagem,
          });
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listarUsuarios(req, res) {
  usuarioModel
    .listarUsuarios()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os usuarios: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrar,
  verificar,
  autenticar,
  listarUsuarios,
};
