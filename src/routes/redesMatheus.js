var express = require("express");
var router = express.Router();

var redeMatheus = require("../controllers/redeMatheusController");


router.get("/listarPacotes/:fkEmpresa", function (req, res) {
    redeMatheus.buscarPacotes(req, res);
});


router.get("/numerosBuscarRede/:fkComponente", function (req, res) {
    redeMatheus.numerosBuscarRede(req, res);
});

router.get("/maquinasBuscarRede/:fkComponente", function (req, res) {
    redeMatheus.maquinasBuscarRede(req, res);
});

module.exports = router;