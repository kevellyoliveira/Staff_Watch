var express = require("express");
var router = express.Router();

var dispositivosController = require("../controllers/dispositivosController");

// função de obter os dados para exibir nas dashboards
router.get("/metrica/:idComponente", function (req, res) {
    dispositivosController.obterDadosGrafico(req, res);
})

// function do atualizar dados
// router.get("/tempo-real/:idComputador:idComponente", function (req, res) {
router.get("/tempo-real/:idComponente", function (req, res) {
    dispositivosController.gerarGraficoTempoReal(req, res);
})


module.exports = router;