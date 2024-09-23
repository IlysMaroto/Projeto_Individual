var express = require("express");
var router = express.Router();

var graficosController = require("../controllers/graficosController");

//Recebendo os dados do html e direcionando para a função cadastrar de graficosController.js
router.get("/postsDia", function (req, res) {
    graficosController.postsDia(req, res);
});

// Quantidade de post por dia que o usuario fez
router.post("/postsDiaUsuario", function (req, res) {
    graficosController.postsDiaUsuario(req, res);
});

// Soma da pontuação do jogo da memoria por dia que o usuario fez
router.post("/pontuacaoDiaUsuario", function (req, res) {
    graficosController.pontuacaoDiaUsuario(req, res);
});

// Quantidade de jogos por dia que o usuario jogou
router.get("/jogosDia", function (req, res) {
    graficosController.jogosDia(req, res);
});

router.post("/jogosDiaUsuario", function (req, res) {
    graficosController.jogosDiaUsuario(req, res);
});

// Grafico da preferencia dos vocaloids pelos usuarios
router.get("/popularidadeVocaloid", function (req, res) {
    graficosController.popularidadeVocaloid(req, res);
})

// Grafico da preferencia dos temas pelos usuarios
router.get("/popularidadeTema", function (req, res) {
    graficosController.popularidadeTema(req, res);
})

module.exports = router; 