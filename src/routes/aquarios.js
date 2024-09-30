var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/aquarioController");

// verificar se o usuário já realizou o quiz
router.get("/:idUsuario", function (req, res) {
  aquarioController.buscarUsuario(req, res);
});

// inserir a pontuação do usuário na tabela
router.post("/cadastrar", function (req, res) {
  aquarioController.cadastrar(req, res);
})

module.exports = router;