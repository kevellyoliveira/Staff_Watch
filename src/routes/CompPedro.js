var express = require("express");
var router = express.Router();

var compPedroController = require("../controllers/compPedroController");

router.get("/alertasEquipe/:fkEmpresa/:tempo/:idComponente", function (req, res) {
    compPedroController.buscarAlertasEquipe(req, res);
});

router.get("/dados/:fkEquipe/:fkEmpresa/:tempo", function (req, res) {
    compPedroController.gerarGraficoCpu(req, res);
} )

router.get("/dadosRam/:fkEquipe/:fkEmpresa/:tempo", function (req, res) {
    compPedroController.gerarGraficoRam(req, res);
} )

router.get("/dadosDisco1/:fkEquipe/:fkEmpresa/:tempo", function (req, res) {
    compPedroController.gerarGraficoDisco1(req, res);
} )

router.get("/dadosDisco2/:fkEquipe/:fkEmpresa/:tempo", function (req, res) {
    compPedroController.gerarGraficoDisco2(req, res);
} )

router.get("/listarAlertas/:fkEquipe/:fkEmpresa/:tempo/:componente", function (req, res) {
    compPedroController.listarAlertas(req, res);
})

module.exports = router;