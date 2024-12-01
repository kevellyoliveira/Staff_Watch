var express = require("express");
var router = express.Router();

var dispositivosController = require("../controllers/dispositivosController");

// função de obter os dados para exibir nas dashboards
router.get("/metrica/:fkEmpresa/:idComponente/:idComputador", function (req, res) {
    dispositivosController.obterDadosGrafico(req, res);
});

// function do atualizar dados
router.get("/tempo-real/:fkEmpresa/:idComponente/:idComputador", function (req, res) {
    dispositivosController.gerarGraficoTempoReal(req, res);
})

// lista todos os funcionários da empresa
router.get("/listar/:fkEmpresa", function (req, res) {
    dispositivosController.listar(req, res);
});

// histórico de alertas da máquina clicada
router.get("/historico/:fkEmpresa/:idComputador", function (req, res) {
    dispositivosController.historico(req, res);
});

//  gráfico de barras na parte de cima de equipes
router.get("/equipes/:fkEmpresa", function (req, res) {
    dispositivosController.equipes(req, res);
});

//  buscar e listar uma máquina pelo id
router.get("/buscar/:fkEmpresa/:inputPesquisa", function (req, res) {
    dispositivosController.buscar(req, res);
});

module.exports = router;