var jogoModel = require("../models/jogoModel.js");

function salvarMemoria(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var fkjogo = 2;
  var fkUsuario = req.body.fkUsuarioServer;
  var pontuacao = req.body.pontuacaoServer;
  var tempojogado = req.body.tempoJogadoServer;

  // Faça as validações dos valores
  if (fkjogo == undefined) {
    res.status(400).send("Seu tema está undefined!");
  } else if (fkUsuario == undefined) {
    res.status(400).send("Sua titulo está undefined!");
  } else if (pontuacao == undefined) {
    res.status(400).send("Sua texto está undefined!");
  } else if (tempojogado == undefined) {
    res.status(400).send("Sua fkUsuario está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    jogoModel
      .salvarMemoria(fkjogo, fkUsuario, pontuacao, tempojogado)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\n ja estou em jogoController !Houve um erro ao realizar o post! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  salvarMemoria,
};
