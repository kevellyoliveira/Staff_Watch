var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/componentes", function (req, res) {
    usuarioController.cadastrarComponente(req, res);
});

router.post("/contato", function (req, res) {
    usuarioController.contato(req, res);
});

// router.post("/consultar", function (req, res) {
//     usuarioController.consultar(req, res);
// });
module.exports = router;