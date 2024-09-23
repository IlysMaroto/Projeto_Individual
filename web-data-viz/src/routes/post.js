var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");

//Recebendo os dados do html e direcionando para a função cadastrar de postController.js
router.post("/cadastrar", function (req, res) {
  postController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  postController.autenticar(req, res);
});
router.post("/enviar", function (req, res) {
  postController.enviar(req, res);
});

router.get("/listarPosts", function (req, res) {
  postController.listarPosts(req, res);
});

router.post("/listarMeusPosts", function (req, res) {
  postController.listarMeusPosts(req, res);
});

module.exports = router;
