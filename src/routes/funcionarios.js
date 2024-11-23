
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

router.get("/detalhes/:fkFuncionario", function (req, res) {
    funcionarioController.abrirModal(req, res);
});

router.get("/dados/tempoEspera/:fkFuncionario", function (req, res) {
    funcionarioController.puxarDadosChamada(req, res);
});

router.get("/dados/tempoChamada/:fkFuncionario", function (req, res) {
    funcionarioController.puxarTempoChamada(req, res);
});

router.get("/dados/totalChamada/:fkFuncionario", function (req, res) {
    funcionarioController.puxarTotalChamada(req, res);
});

router.get("/dados/totalPerdida/:fkFuncionario", function (req, res) {
    funcionarioController.puxarTotalPerdida(req, res);
});

router.get("/dados/totalAtendida/:fkFuncionario", function (req, res) {
    funcionarioController.puxarTotalAtendida(req, res);
});

router.get("/dados/:endpoint/:fkFuncionario", function (req, res) {
    funcionarioController.carregarGrafico(req, res);
});



                                            // Equipe

router.get("/dados/tempoEspera/:fkEquipe", function (req, res) {
funcionarioController.puxarDadosEquipeChamada(req, res);
});
                                            
router.get("/dados/tempoChamada/:fkEquipe", function (req, res) {
funcionarioController.puxarTempoEquipeChamada(req, res);
});
                                            
router.get("/dados/totalChamada/:fkEquipe", function (req, res) {
funcionarioController.puxarTotalEquipeChamada(req, res);
});
                                            
router.get("/dados/totalPerdida/:fkEquipe", function (req, res) {
funcionarioController.puxarTotalEquipePerdida(req, res);
});
                                            
router.get("/dados/totalAtendida/:fkEquipe", function (req, res) {
funcionarioController.puxarTotalEquipeAtendida(req, res);
});

router.get("/dados/eficienciaEquipeChamada/:fkEquipe", function (req, res) {
funcionarioController.eficienciaEquipeChamada(req, res);
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

router.get("/plotarGrafico/:fkEmpresa", function (req, res) {
    funcionarioController.plotarGrafico(req, res);
});

module.exports = router;