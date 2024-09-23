var express = require("express");
var router = express.Router();

var jogoController = require("../controllers/jogoController");

//Recebendo os dados do html e direcionando para a função cadastrar de postController.js
router.post("/salvarMemoria", function (req, res) {
  jogoController.salvarMemoria(req, res);
});

module.exports = router;
