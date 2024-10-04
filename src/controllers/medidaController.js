var medidaModel = require("../models/medidaModel");

// essa função é utilizada para exibir o gráfico do index de usuários com maior pontuação
function buscarUltimasMedidas(req, res) {

    var idUsuario = req.params.idUsuario;

    medidaModel.buscarUltimasMedidas(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasCurtidas(req, res) {

    var idUsuario = req.params.idUsuario;

    medidaModel.buscarUltimasMedidasCurtidas(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//essa funcao será utilizada pra fazer o gráfico de usuários com mais curtidas em posts!
function buscarMedidasEmTempoReal(req, res) {
    var idAquario = req.params.idAquario;
    console.log(`Recuperando medidas em tempo real`);
    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// essa função vai obter o total de pontos obtidos pelo usuário
function obterDadosUserPontuacao(req, res) {

    var idUsuario = req.params.idUsuario;

    medidaModel.obterDadosUserPontuacao(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a pontuação.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// essa função vai obter o total de quizzes realizados pelo usuário
function obterDadosUserQuizzes(req, res) {

    var idUsuario = req.params.idUsuario;

    medidaModel.obterDadosUserQuizzes(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os quizzes.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// essa função vai obter o total de posts realizados pelo usuário
function obterDadosUserPosts(req, res) {

    var idUsuario = req.params.idUsuario;

    medidaModel.obterDadosUserPosts(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os posts.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function obterDadosUserCurtidas(req, res) {

    var idUsuario = req.params.idUsuario;
    var idPostagem = req.params.idPostagem;

    medidaModel.obterDadosUserCurtidas(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as curtidas recebidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    obterDadosUserPontuacao,
    obterDadosUserQuizzes,
    obterDadosUserPosts,
    obterDadosUserCurtidas,
    buscarUltimasMedidasCurtidas
}