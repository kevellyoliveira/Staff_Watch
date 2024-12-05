var express = require("express");
var router = express.Router();

var redeRuanController = require("../controllers/redeRuanController");


router.get("/pacotesPerdidos/:numeroSalvo", function (req, res) {
    redeRuanController.puxarPacotesPerdidos(req, res);
});

router.get("/inatividade", function (req, res) {
    redeRuanController.puxarInatividade(req, res);
});

router.get("/tempoFalhas", function (req, res) {
    redeRuanController.puxarTempoFalhas(req, res);
});

router.get("/graficoLatencia", function (req, res) {
    redeRuanController.puxarGraficoLatencia(req, res);
});

router.get("/graficoTrafego", function (req, res) {
    redeRuanController.puxarGraficoTrafego(req, res);
});






module.exports = router;