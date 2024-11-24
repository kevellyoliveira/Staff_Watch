var express = require("express");
var router = express.Router();

var redeRuanController = require("../controllers/redeRuanController");


router.get("/pacotesPerdidos", function (req, res) {
    redeRuanController.puxarPacotesPerdidos(req, res);
});

router.get("/inatividade", function (req, res) {
    redeRuanController.puxarInatividade(req, res);
});

router.get("/tempoFalhas", function (req, res) {
    redeRuanController.puxarTempoFalhas(req, res);
});






module.exports = router;