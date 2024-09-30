
var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    avisoController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:mensagem", function (req, res) {
    avisoController.pesquisarmensagem(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    avisoController.deletar(req, res);
});


router.post("/pontuar", function (req, res) {
    avisoController.pontuar(req, res);
});

router.post("/curtir/:idUsuario/:idPostagem", function (req, res) {
    avisoController.curtir(req, res);
});

router.delete("/descurtir/:idUsuario/:idPostagem", function (req, res) {
    avisoController.descurtir(req, res);
});



module.exports = router;