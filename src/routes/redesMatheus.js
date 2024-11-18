var express = require("express");
var router = express.Router();

var redeMatheus = require("../controllers/redeMatheusController");

router.get("/listarPacotes/", function (req, res) {
    redeMatheus.buscarPacotes(req, res);
});


module.exports = router;