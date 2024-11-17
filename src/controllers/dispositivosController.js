var dispositivoModel = require("../models/dispositivoModel");
var database = require("../database/config");

function gerarGraficoTempoReal(req, res) {

    var idComputador = req.params.idComputador;
    var idComponente = req.params.idComponente;


    console.log(`Recuperando medidas do computador ${idComputador} e do componente ${idComponente} em tempo real`);

    model.gerarGraficoTempoReal(idComputador, idComponente).then(function (resultado) {
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


module.exports = {
    gerarGraficoTempoReal
}