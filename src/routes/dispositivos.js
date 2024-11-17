var express = require("express");
var router = express.Router();

var dispositivosController = require("../controllers/dispositivosController");

// function do atualizar dados
router.get("/tempo-real/:idComputador:idComponente", function (req, res) {
    dispositivosController.gerarGraficoTempoReal(req, res);
})


module.exports = router;