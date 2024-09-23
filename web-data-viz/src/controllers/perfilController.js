var perfilModel = require("../models/perfilModel.js");

function verificar(req, res) {
  var idusuario = req.body.iduserServer;

  if (idusuario == undefined) {
    res.status(400).send("O ID está undefined!");
  } else {
    perfilModel
      .verificar(idusuario)
      .then(function (resultadoVerificar) {
        // console.log("Verificar:", resultadoVerificar);
        // console.log(`\nResultados encontrados: ${resultadoVerificar.length}`);
        // console.log(`Resultados: ${JSON.stringify(resultadoVerificar)}`); // transforma JSON em String
        res.status(200).json(resultadoVerificar);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao verificar! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function atualizar(req, res) {
  var apelido = req.body.apelidoServer;
  var resumo = req.body.resumoServer;
  var gosto = req.body.gostoServer;
  var sobre = req.body.sobreServer;
  var fkvocaloid = req.body.vocaloidServer;
  var fkatuacao = req.body.atuacaoServer;
  var fkimagem = req.body.imagemServer;
  var idUser = req.body.idUserServer;

  if (apelido == undefined) {
    res.status(400).send("Seu apelido está undefined!");
  } else if (resumo == undefined) {
    res.status(400).send("Seu resumo está undefined!");
  } else if (gosto == undefined) {
    res.status(400).send("Sua gosto está indefinida!");
  } else if (sobre == undefined) {
    res.status(400).send("Sua sobre está undefined!");
  } else if (fkvocaloid == undefined) {
    res.status(400).send("Seu vocaloid está undefined!");
  } else if (fkatuacao == undefined) {
    res.status(400).send("Sua atuação está undefined!");
  } else if (fkimagem == undefined) {
    res.status(400).send("Sua imagem está undefined!");
  } else if (idUser == undefined) {
    res.status(400).send("Seu idUser está undefined!");
  } else {
    perfilModel
      .atualizar(apelido, resumo, gosto, sobre, fkvocaloid, fkatuacao, fkimagem, idUser)
      .then(function (resultado) {
        // console.log("Atualizar:", resultado);

        if (resultado.changedRows == 0) {
          res.status(403).send("id do usuario não encontrado ou dados iguais aos armazenados");
        } else {
          res.status(200).json({});
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listarPerfis(req, res) {
  perfilModel
    .listarPerfis()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os perfis: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  verificar,
  atualizar,
  listarPerfis,
};
