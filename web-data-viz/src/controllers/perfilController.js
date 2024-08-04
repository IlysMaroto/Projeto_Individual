var perfilModel = require("../models/perfilModel.js");

function verificar(req, res) {
    var idusuario = req.body.iduserServer;

    if (idusuario == undefined) {
            res.status(400).send("O ID está undefined!");
    } else {
        perfilModel
          .verificar(idusuario)
          .then(function (resultadoVerificar) {
            console.log(`\nResultados encontrados: ${resultadoVerificar.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoVerificar)}`); // transforma JSON em String
            res.status(200).json(resultadoVerificar);
    })
          .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao verificar! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
          });
      }}


// function atualizar(req, res) {
//   // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
//   console.log(req.body)
//   var apelido = req.body.apelidoServer;
//   var resumo = req.body.resumoServer;
//   var gosto = req.body.gostoServer;
//   var sobre = req.body.sobreServer;
//   var fkatuacao = req.body.fkatuacaoServer;
//   var fkimagem = req.body.fkimagemServer;
//   var fkvocaloid = req.body.fkvocaloidServer;
//   var vocaloid = req.body.vocaloidServer;
//   console.log(apelido, resumo, gosto, sobre, fkimagem, fkvocaloid, vocaloid);

//   // Faça as validações dos valores
//   if (apelido == undefined) {
//     res.status(400).send("Seu apelido está undefined!");
//   } else if (resumo == undefined) {
//     res.status(400).send("Seu resumo está undefined!");
//   } else if (gosto == undefined) {
//     res.status(400).send("Sua gosto está undefined!");
//   } else if (sobre == undefined) {
//     res.status(400).send("Sua sobre está undefined!");
//   } else if (fkimagem == undefined) {
//     res.status(400).send("Sua imagem está undefined!");
//   } else if (fkvocaloid == undefined) {
//     res.status(400).send("Seu vocaloid está undefined!");
//   } else if (vocaloid == undefined) {
//     res.status(400).send("Seu vocaloid está undefined!");
//   } else {
//     // Passe os valores como parâmetro e vá para o arquivo perfilModel.js
//     perfilModel
//       .cadastrar(apelido, resumo, gosto, sobre, fkimagem, fkvocaloid, vocaloid)
//       .then(function (resultado) {
//         res.json(resultado);
//       })
//       .catch(function (erro) {
//         console.log(erro);
//         console.log("\nHouve um erro ao realizar a atualização! Erro: ", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//       });
//   }
// }

function atualizar(req, res) {
    var apelido = req.body.apelidoServer;
    var resumo = req.body.resumoServer;
    var gosto = req.body.gostoServer;
    var sobre = req.body.sobreServer;
    var fkvocaloid = req.body.vocaloidServer;
    var fkatuacao = req.body.atuacaoServer;
    var fkimagem = req.body.imagemServer;
    var idUser = req.body.idUserServer;

  if (resumo == undefined) {
    res.status(400).send("Seu resumo está undefined!");
  } else if (gosto == undefined) {
    res.status(400).send("Sua gosto está indefinida!");
  } else {
    perfilModel
      .atualizar(apelido, resumo, gosto, sobre, fkvocaloid, fkatuacao, fkimagem, idUser)
      .then(function (resultadoverificar) {
        console.log(`\nResultados encontrados: ${resultadoverificar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoverificar)}`); // transforma JSON em String

        if (resultadoverificar.length == 1) {
          console.log(resultadoverificar);
           
              res.json({
                idusuario: resultadoverificar[0].idusuario,
                resumo: resultadoverificar[0].resumo,
                apelido: resultadoverificar[0].apelido,
                gosto: resultadoverificar[0].gosto,
              });
            
        } else if (resultadoverificar.length == 0) {
          res.status(403).send("resumo e/ou gosto inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e gosto!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
    verificar,
    atualizar,
};