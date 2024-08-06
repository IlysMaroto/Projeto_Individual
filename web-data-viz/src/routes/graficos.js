var express = require("express");
var router = express.Router();

var graficosController = require("../controllers/graficosController");

//Recebendo os dados do html e direcionando para a função cadastrar de graficosController.js
router.post("/quantidadePost", function (req, res) {
    graficosController.quantidadePost(req, res);
})

// router.post("/recordVelha", function (req, res) {
//     graficosController.recordVelha(req, res);
// });
// router.post("/recordMemoria", function (req, res) {
//     graficosController.recordMemoria(req, res);
// })

// router.get("/graficoPerfil", function (req, res) {
//     graficosController.graficoPerfil(req, res);
// });

// router.post("/percentualGenero", function (req, res) {
//     graficosController.percentualGenero(req, res);
// })

// router.post("/percentualComo", function (req, res) {
//     graficosController.percentualComo(req, res);
// })

// router.post("/percentualAtuacao", function (req, res) {
//     graficosController.percentualAtuacao(req, res);
// });
// router.post("/linhaPost", function (req, res) {
//     graficosController.linhaPost(req, res);
// })

// router.post("/rankMemoria", function (req, res) {
//     graficosController.rankMemoria(req, res);
// })

// router.post("/pontuacaoMemoria", function (req, res) {
//     graficosController.pontuacaoMemoria(req, res);
// });


module.exports = router; 