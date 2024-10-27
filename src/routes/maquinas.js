var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

// verificar se o usuário já realizou o quiz
// router.get("/:idUsuario", function (req, res) {
//   maquinaController.buscarUsuario(req, res);
// });

// cadastrar uma máquina nova
router.post("/cadastrar", function (req, res) {
  maquinaController.cadastrar(req, res);
})

//atualiza a equipe que a máquina pertence
router.put("/atualizar", function (req, res) {
  maquinaController.cadastrar(req, res);
})

router.get("/listarEquipe/:fkEmpresa", function (req, res) {
  maquinaController.listarEquipe(req, res);
})


router.post("/cadastrarEquipe", function (req, res) {
  maquinaController.cadastrarEquipe(req, res);
})

router.post("/remover", function (req, res) {
  maquinaController.removerEquipe(req, res);
})

module.exports = router;