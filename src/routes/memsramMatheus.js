var express = require("express");
var router = express.Router();

var memramMatheus = require("../controllers/memramMatheusController");

router.get("/listarRam/:fkEmpresa", function (req, res) {
    memramMatheus.buscarRam(req, res);
});


router.get("/numerosBuscarRam/:fkComponente", function (req, res) {
    memramMatheus.numerosBuscarRam(req, res);
});

router.get("/maquinasBuscarRam/:fkComponente", function (req, res) {
    memramMatheus.maquinasBuscarRam(req, res);
});

module.exports = router;