var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

//ROTAS DE GRÁFICOS - index.html

// rota utilizada pra gerar o gráfico de top 3 usuários com mais pontos
router.get("/ultimas/:idUsuario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

// rota utilizada pra gerar o gráfico de top 3 usuários com mais curtidas
router.get("/ultimasCurtidas/:idUsuario", function (req, res) {
    medidaController.buscarUltimasMedidasCurtidas(req, res);
});


//ROTAS DE DADOS DO USUÁRIO - user.html

// rota utilizada pra obter o total de pontos obtidos pelo usuário
router.get("/userPontuacao/:idUsuario", function (req, res) {
    medidaController.obterDadosUserPontuacao(req, res);
})

// rota utilizada pra obter o total de quizzes realizados pelo usuário
router.get("/userQuiz/:idUsuario", function (req, res) {
    medidaController.obterDadosUserQuizzes(req, res);
})

// rota utilizada pra obter o total de postagens realizadas pelo usuário
router.get("/userPost/:idUsuario", function (req, res) {
    medidaController.obterDadosUserPosts(req, res);
})

// rota utilizada pra obter o total de curtidas recebidas pelo usuário
router.get("/userCurtidas/:idUsuario", function (req, res) {
    medidaController.obterDadosUserCurtidas(req, res);
})


module.exports = router;