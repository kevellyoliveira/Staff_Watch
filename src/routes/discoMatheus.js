var express = require("express");
var router = express.Router();

var discoMatheus = require("../controllers/discoMatheusController");


router.get("/listarDisco/:fkEmpresa", function (req, res) {
    discoMatheus.buscarDisco(req, res);
});


module.exports = router;