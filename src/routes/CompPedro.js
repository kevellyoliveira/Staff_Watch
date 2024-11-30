var express = require("express");
var router = express.Router();

var compPedroController = require("../controllers/compPedroController");

router.get("/alertas/:fkEmpresa/:tempo/:idcomponente", function (req, res) {
    compPedroController.buscarAlertasEquipe(req, res);
});

router.get("dados/:fkEquipe/:fkEmpresa/:tempo", function (req, res) {
    compPedroController.gerarGraficoCpu(req, res);
} )

router.get("dadosRam/:fkEquipe/:fkEmpresa/:tempo", function (req, res) {
    compPedroController.gerarGraficoRam(req, res);
} )

router.get("dadosDisco1/:fkEquipe/:fkEmpresa/:tempo", function (req, res) {
    compPedroController.gerarGraficoDisco1(req, res);
} )

router.get("dadosDisco2/:fkEquipe/:fkEmpresa/:tempo", function (req, res) {
    compPedroController.gerarGraficoDisco2(req, res);
} )

module.exports = router;