
var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.get("/listar", function (req, res) {
    funcionarioController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    funcionarioController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:mensagem", function (req, res) {
    funcionarioController.pesquisarmensagem(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    funcionarioController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    funcionarioController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    funcionarioController.deletar(req, res);
});


router.post("/pontuar", function (req, res) {
    funcionarioController.pontuar(req, res);
});

router.post("/curtir/:idUsuario/:idPostagem", function (req, res) {
    funcionarioController.curtir(req, res);
});

router.delete("/descurtir/:idUsuario/:idPostagem", function (req, res) {
    funcionarioController.descurtir(req, res);
});



module.exports = router;