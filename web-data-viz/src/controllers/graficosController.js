var graficosModel = require("../models/graficosModel");

function enviar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var tema = req.body.temaServer;
  var titulo = req.body.tituloServer;
  var texto = req.body.textoServer;
  var fkUsuario = req.body.fkUsuarioServer;

  // Faça as validações dos valores
  if (tema == undefined) {
    res.status(400).send("Seu tema está undefined!");
  } else if (titulo == undefined) {
    res.status(400).send("Sua titulo está undefined!");
  } else if (texto == undefined) {
    res.status(400).send("Sua texto está undefined!");
  } else if (fkUsuario == undefined) {
    res.status(400).send("Sua fkUsuario está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    graficosModel
      .enviar(tema, titulo, texto, fkUsuario)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\n ja estou em postController !Houve um erro ao realizar o post! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listarPosts(req, res) {
  graficosModel
    .listarPosts()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os posts: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarMeusPosts(req, res) {
  var idusuario = req.body.iduserServer;

  if (idusuario == undefined) {
    res.status(400).send("O ID está undefined!");
  } else {
    graficosModel
      .listarMeusPosts(idusuario)
      .then(function (resultadoVerificar) {
        //   console.log(`\nResultados encontrados: ${resultadoVerificar.length}`);
        //   console.log(`Resultados: ${JSON.stringify(resultadoVerificar)}`); // transforma JSON em String
        res.status(200).json(resultadoVerificar);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao verificar! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function postsDia(req, res) {
  graficosModel
    .postsDia()
    .then((resultadoVerificar) => {
      res.status(200).json(resultadoVerificar);
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

function postsDiaUsuario(req, res) {
  var id = req.body.iduserServer;

  if (id == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    graficosModel
      .postsDiaUsuario(id)
      .then((resultadoVerificar) => {
        res.status(200).json(resultadoVerificar);
      })
      .catch((erro) => {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function pontuacaoDiaUsuario(req, res) {
  var id = req.body.iduserServer;

  if (id == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    graficosModel
      .pontuacaoDiaUsuario(id)
      .then((resultadoVerificar) => {
        res.status(200).json(resultadoVerificar);
      })
      .catch((erro) => {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function jogosDia(req, res) {
  graficosModel
    .jogosDia()
    .then((resultadoVerificar) => {
      res.status(200).json(resultadoVerificar);
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

function popularidadeVocaloid(req, res) {
  graficosModel
    .popularidadeVocaloid()
    .then((resultadoVerificar) => {
      res.status(200).json(resultadoVerificar);
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
}

function popularidadeTema(req, res) {
  graficosModel
    .popularidadeTema()
    .then((resultadoVerificar) => {
      res.status(200).json(resultadoVerificar);
    })
    .catch((erro) => {
      res.status(500).json(erro.sqlMessage);
    });
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
