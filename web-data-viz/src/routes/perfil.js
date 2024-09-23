var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

//Recebendo os dados do html e direcionando para a função cadastrar de perfilController.js
router.post("/atualizar", function (req, res) {
  perfilController.atualizar(req, res);
});

router.post("/verificar", function (req, res) {
  perfilController.verificar(req, res);
});

router.get("/listarPerfis", function (req, res) {
  perfilController.listarPerfis(req, res);
});

module.exports = router;
