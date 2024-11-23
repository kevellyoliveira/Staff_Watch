var express = require("express");
var router = express.Router();

var redeRuanController = require("../controllers/redeRuanController");


router.get("/pacotesPerdidos", function (req, res) {
    redeRuanController.puxarPacotesPerdidos(req, res);
    });






module.exports = router;