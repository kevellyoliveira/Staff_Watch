
var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

// rotas utilizadas
router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
});

router.post("/cadastrarGerenteTI", function (req, res) {
    funcionarioController.cadastrarGerenteTI(req, res);
});

router.post("/cadastrarGerenteOp", function (req, res) {
    funcionarioController.cadastrarGerenteOp(req, res);
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


router.get("/dados/tempoEspera/:idFunc", function (req, res) {
    funcionarioController.puxarDadosChamada(req, res);
});

router.get("/dados/tempoChamada/:idFunc", function (req, res) {
    funcionarioController.puxarTempoChamada(req, res);
});

router.get("/dados/totalChamada/:idFunc", function (req, res) {
    funcionarioController.puxarTotalChamada(req, res);
});

router.get("/dados/totalPerdida/:idFunc", function (req, res) {
    funcionarioController.puxarTotalPerdida(req, res);
});

router.get("/dados/totalAtendida/:idFunc", function (req, res) {
    funcionarioController.puxarTotalAtendida(req, res);
});

router.get("/dados/eficiencia/:idFunc", function (req, res) {
    funcionarioController.eficienciaChamada(req, res);
});

router.get("/dados/:endpoint/:idFunc", function (req, res) {
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


router.get("/dados/eficiencia/:fkEquipe", function (req, res) {
    funcionarioController.eficienciaEquipeChamada(req, res);
});

// Empresa

router.get("/dados/tempoEspera/:fkEmpresa", function (req, res) {
    funcionarioController.puxarDadosEmpresaChamada(req, res);
});

router.get("/dados/tempoChamada/:fkEmpresa", function (req, res) {
    funcionarioController.puxarTempoEmpresaChamada(req, res);
});

router.get("/dados/totalChamada/:fkEmpresa", function (req, res) {
    funcionarioController.puxarTotalEmpresaChamada(req, res);
});

router.get("/dados/totalPerdida/:fkEmpresa", function (req, res) {
    funcionarioController.puxarTotalEmpresaPerdida(req, res);
});

router.get("/dados/totalAtendida/:fkEmpresa", function (req, res) {
    funcionarioController.puxarTotalEmpresaAtendida(req, res);
});

router.get("/dados/eficiencia/:fkEmpresa", function (req, res) {
    funcionarioController.eficienciaEmpresaChamada(req, res);
});

// Filtro

router.get("/dados/tempo/:dataSelecionada/:fkEmpresa", function (req, res) {
    funcionarioController.filtrarTempoChamadaMedia(req, res);
});

router.get("/dados/tempoEficiencia/:dataSelecionada/:fkEmpresa", function (req, res) {
    funcionarioController.filtrarTempoEficiencia(req, res);
});

router.get("/dados/tempoEspera/:dataSelecionada/:fkEmpresa", function (req, res) {
    funcionarioController.filtrarTempoMedioEspera(req, res);
});

router.get("/dados/tempoPerdida/:dataSelecionada/:fkEmpresa", function (req, res) {
    funcionarioController.filtrarTempoChamadaPerdida(req, res);
});

router.get("/dados/grafico/:dataSelecionada/:fkEmpresa", function (req, res) {
    funcionarioController.filtrarTempoGrafico(req, res);
});

router.get("/contarEquipes/:fkEmpresa", function (req, res) {
    funcionarioController.contarEquipes(req, res);
});

router.get("/dados/equipeAlerta/:fkEquipe/:fkEmpresa", function (req, res) {
    funcionarioController.pegarDadosAlerta(req, res);
});


// Filtro do funcionário

router.get("/dados/filtro/tempoChamada/:dataSelecionada/:idFunc", function (req, res) {
    funcionarioController.filtrarTempoChamada(req, res);
});

router.get("/dados/filtro/tempoEspera/:dataSelecionada/:idFunc", function (req, res) {
    funcionarioController.filtrarTempoEspera(req, res);
});

router.get("/dados/filtro/eficiencia/:dataSelecionada/:idFunc", function (req, res) {
    funcionarioController.filtrarEficiencia(req, res);
});


router.get("/dados/filtro/totalPerdida/:dataSelecionada/:idFunc", function (req, res) {
    funcionarioController.filtrarPerdida(req, res);
});


// Outro projeto

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