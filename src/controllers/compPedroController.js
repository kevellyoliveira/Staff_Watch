var compPedroModel = require("../models/compPedroModel");

function buscarAlertasEquipe(req, res) {

    // var idComputador = req.params.idComputador;
    var fkEmpresa = req.params.fkEmpresa;
    var idComponente = req.params.idComponente;
    var tempo = req.params.tempo;
    

    // console.log(`Recuperando medidas do computador ${idComputador} e do componente ${idComponente} em tempo real`);
    console.log(`Recuperando medidas do computador em tempo real do componente ${idComponente}`);
    console.log(`Recuperando alertas gerados dos computadores da empresa de fkEmpresa: ${fkEmpresa}`);

    // compPedroModel.gerarGraficoTempoReal(idComputador, idComponente).then(function (resultado) {
    compPedroModel.buscarAlertasEquipe(fkEmpresa,idComponente,tempo).then(function (resultado) {
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

function gerarGraficoCpu(req, res) {

    // var idComputador = req.params.idComputador;
    var fkEquipe = req.params.fkEquipe;
    var fkEmpresa = req.params.fkEmpresa;
    var tempo = req.params.tempo;
    

    // console.log(`Recuperando medidas do computador ${idComputador} e do componente ${idComponente} em tempo real`);
    console.log(`Gerando gráficos de dados capturados de computadores da empresa de fkEmpresa: ${fkEmpresa}`)

    // compPedroModel.gerarGraficoTempoReal(idComputador, idComponente).then(function (resultado) {
    compPedroModel.gerarGraficoCpu(fkEquipe, fkEmpresa, tempo).then(function (resultado) {
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

function gerarGraficoRam(req, res) {

    // var idComputador = req.params.idComputador;
    var fkEquipe = req.params.fkEquipe;
    var fkEmpresa = req.params.fkEmpresa;
    var tempo = req.params.tempo;
    

    // console.log(`Recuperando medidas do computador ${idComputador} e do componente ${idComponente} em tempo real`);
    console.log(`Gerando gráficos de dados capturados de computadores da empresa de fkEmpresa: ${fkEmpresa}`)

    // compPedroModel.gerarGraficoTempoReal(idComputador, idComponente).then(function (resultado) {
    compPedroModel.gerarGraficoRam(fkEquipe, fkEmpresa, tempo).then(function (resultado) {
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

function gerarGraficoDisco1(req, res) {

    // var idComputador = req.params.idComputador;
    var fkEquipe = req.params.fkEquipe;
    var fkEmpresa = req.params.fkEmpresa;
    var tempo = req.params.tempo;
    

    // console.log(`Recuperando medidas do computador ${idComputador} e do componente ${idComponente} em tempo real`);
    console.log(`Gerando gráficos de dados capturados de computadores da empresa de fkEmpresa: ${fkEmpresa}`)

    // compPedroModel.gerarGraficoTempoReal(idComputador, idComponente).then(function (resultado) {
    compPedroModel.gerarGraficoDisco1(fkEquipe, fkEmpresa, tempo).then(function (resultado) {
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

function gerarGraficoDisco2(req, res) {

    // var idComputador = req.params.idComputador;
    var fkEquipe = req.params.fkEquipe;
    var fkEmpresa = req.params.fkEmpresa;
    var tempo = req.params.tempo;
    

    // console.log(`Recuperando medidas do computador ${idComputador} e do componente ${idComponente} em tempo real`);
    console.log(`Gerando gráficos de dados capturados de computadores da empresa de fkEmpresa: ${fkEmpresa}`)

    // compPedroModel.gerarGraficoTempoReal(idComputador, idComponente).then(function (resultado) {
    compPedroModel.gerarGraficoDisco2(fkEquipe, fkEmpresa, tempo).then(function (resultado) {
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

function listarAlertas(req, res) {

    // var idComputador = req.params.idComputador;
    var componente = req.params.componente;
    var fkEquipe = req.params.fkEquipe;
    var fkEmpresa = req.params.fkEmpresa;
    var tempo = req.params.tempo;
   
    

    // console.log(`Recuperando medidas do computador ${idComputador} e do componente ${idComponente} em tempo real`);

    // compPedroModel.gerarGraficoTempoReal(idComputador, idComponente).then(function (resultado) {
    compPedroModel.listarAlertas(fkEquipe, fkEmpresa, tempo, componente).then(function (resultado) {
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
    buscarAlertasEquipe,
    gerarGraficoCpu,
    gerarGraficoRam,
    gerarGraficoDisco1,
    gerarGraficoDisco2,
    listarAlertas
};
