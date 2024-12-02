var dispositivoModel = require("../models/dispositivoModel");

function gerarGraficoTempoReal(req, res) {

    // var idComputador = req.params.idComputador;
    var idComponente = req.params.idComponente;
    var fkEmpresa = req.params.fkEmpresa;
    var idComputador = req.params.idComputador;

    // console.log(`Recuperando medidas do computador ${idComputador} e do componente ${idComponente} em tempo real`);
    console.log(`Recuperando medidas do computador em tempo real do componente ${idComponente}`);

    // dispositivoModel.gerarGraficoTempoReal(idComputador, idComponente).then(function (resultado) {
    dispositivoModel.gerarGraficoTempoReal(fkEmpresa, idComponente, idComputador).then(function (resultado) {
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

function obterDadosGrafico(req, res) {

    var idComponente = req.params.idComponente;
    var fkEmpresa = req.params.fkEmpresa;
    var idComputador = req.params.idComputador;

    console.log(`Recuperando últimas 20 medidas da máquina`);

    dispositivoModel.obterDadosGrafico(fkEmpresa, idComponente, idComputador)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                console.log("Nenhum resultado encontrado no banco de dados.");
                res.status(204).send("Nenhum resultado encontrado.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar dados no banco:", erro.sqlMessage);
            res.status(500).json({ error: erro.sqlMessage });
        });

}

//Listando todas as máquinas
function listar(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    dispositivoModel.listar(fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as máquinas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function historico(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    var idComputador = req.params.idComputador;
    var dataFiltro = req.params.dataFiltro;
    var filtroAlerta = req.params.filtroAlerta;
    var filtroComponente = req.params.filtroComponente;


    dispositivoModel.historico(fkEmpresa, idComputador, dataFiltro, filtroAlerta, filtroComponente)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os alertas no banco: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function equipes(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    dispositivoModel.equipes(fkEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os alertas no banco: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// Listando a máquina buscada 
function buscar(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    const idComputador = req.params.inputPesquisa;
    dispositivoModel.buscar(fkEmpresa, idComputador).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a máquina: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    gerarGraficoTempoReal,
    obterDadosGrafico,
    listar,
    historico,
    equipes,
    buscar
}