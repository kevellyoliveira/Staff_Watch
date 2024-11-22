var express = require("express");
var router = express.Router();

var enderecosController = require("../controllers/enderecosController");

router.get("/listarEnderecos/:fkEmpresa", function (req, res) {
    enderecosController.listarEnderecos(req, res);
});


router.get("/numerosBuscar/:fkComponente", function (req, res) {
    enderecosController.numerosBuscar(req, res);
});

router.get("/maquinasBuscarCpu/:fkComponente", function (req, res) {
    enderecosController.maquinasBuscarCpu(req, res);
});

router.get("/funcaoGeral/:fkComponente", function (req, res) {
    enderecosController.funcaoGeral(req, res);
});

module.exports = router;