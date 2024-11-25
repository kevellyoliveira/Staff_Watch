var redeRuanModel = require("../models/redeRuanModel");

function puxarPacotesPerdidos(req, res) {
    // const idFuncionario = req.params.idFuncionario;

    redeRuanModel.puxarPacotesPerdidos()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao puxar pacotes perdidos ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}

function puxarInatividade(req, res) {
    // const idFuncionario = req.params.idFuncionario;

    redeRuanModel.puxarInatividade()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao puxar tempo de inatividade ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}

function puxarTempoFalhas(req, res) {
    // const idFuncionario = req.params.idFuncionario;

    redeRuanModel.puxarTempoFalhas()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao puxar tempo entre falhas.", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}



// Gráficos da Dashboard



function puxarGraficoLatencia(req, res) {
    // const idFuncionario = req.params.idFuncionario;

    redeRuanModel.puxarGraficoLatencia()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao plotar gráfico latencia", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}



function puxarGraficoTrafego(req, res) {
    // const idFuncionario = req.params.idFuncionario;

    redeRuanModel.puxarGraficoTrafego()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao plotar gráfico trafego de rede", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}


module.exports = {
    puxarPacotesPerdidos,
    puxarInatividade,
    puxarTempoFalhas,
    puxarGraficoLatencia,
    puxarGraficoTrafego
}