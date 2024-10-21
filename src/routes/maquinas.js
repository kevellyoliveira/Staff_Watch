var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

// verificar se o usuário já realizou o quiz
router.get("/:idUsuario", function (req, res) {
  maquinaController.buscarUsuario(req, res);
});

// cadastrar uma máquina nova
router.post("/cadastrar", function (req, res) {
  maquinaController.cadastrar(req, res);
})

router.post("/componente", function (req, res) {
  maquinaController.cadastrarComponente(req, res);
})

router.post("/remover", function (req, res) {
  maquinaController.removerComponente(req, res);
})

module.exports = router;