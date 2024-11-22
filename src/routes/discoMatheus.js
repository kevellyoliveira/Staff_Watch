var express = require("express");
var router = express.Router();

var discoMatheus = require("../controllers/discoMatheusController");


router.get("/listarDisco/:fkEmpresa", function (req, res) {
    discoMatheus.buscarDisco(req, res);
});

router.get("/numerosBuscarDisco/:fkComponente", function (req, res) {
    discoMatheus.numerosBuscarDisco(req, res);
});


router.get("/maquinasBuscarDisco/:fkComponente", function (req, res) {
    discoMatheus.maquinasBuscarDisco(req, res);
});


module.exports = router;