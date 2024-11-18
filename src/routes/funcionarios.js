
var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

// rotas utilizadas
router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
});

// rotas nao utilizadas  ==========================================================================================
router.get("/listar/:fkEmpresa", function (req, res) {
    funcionarioController.listar(req, res);
});

router.get("/listar/:fkEmpresa/:inputPesquisa", function (req, res) {
    funcionarioController.listarPorUsuario(req, res);
});

router.get("/listarEquipe/:fkEmpresa/:fkEquipe", function (req, res) {
    funcionarioController.listarEquipe(req, res);
});

router.get("/listarEquipes/:fkEmpresa", function (req, res) {
    funcionarioController.listarEquipes(req, res);
});


router.get("/pesquisar/:mensagem", function (req, res) {
    funcionarioController.pesquisarmensagem(req, res);
});

router.put("/editar/:idFuncionario", function (req, res) {
    funcionarioController.editar(req, res);
});

router.put("/deletar/:idFuncionario", function (req, res) {
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