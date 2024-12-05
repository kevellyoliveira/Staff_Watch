var express = require("express");
var router = express.Router();

const reportController = require('../controllers/reportController');

// Rota para gerar o relatório
router.get('/generate', reportController.generateReport);

module.exports = router;