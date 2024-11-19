var express = require("express");
var router = express.Router();

var memramMatheus = require("../controllers/memramMatheusController");

router.get("/listarRam/:fkEmpresa", function (req, res) {
    memramMatheus.buscarRam(req, res);
});


module.exports = router;