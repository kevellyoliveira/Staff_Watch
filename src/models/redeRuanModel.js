
var database = require("../database/config");

function puxarPacotesPerdidos(numeroSalvo) {
    console.log(numeroSalvo)
    console.log(numeroSalvo)
    console.log(numeroSalvo)
    console.log(numeroSalvo)
    console.log(numeroSalvo)
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    if (numeroSalvo == 0) {
        var instrucaoSql = `
    SELECT captura, dataCaptura FROM captura WHERE fkAuxComponente = 21;
    `;
    } else {
        var instrucaoSql = `
        SELECT captura, dataCaptura 
    FROM captura 
    WHERE fkAuxComponente = 21 
    AND dataCaptura >= NOW() - INTERVAL ${numeroSalvo} DAY;
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function puxarInatividade(numeroSalvo) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    if (numeroSalvo == 0) {
        var instrucaoSql = `
    SELECT captura, dataCaptura FROM captura WHERE fkAuxComponente = 26;
    `;
    } else {
        var instrucaoSql = `
        SELECT captura, dataCaptura 
    FROM captura 
    WHERE fkAuxComponente = 26 
    AND dataCaptura >= NOW() - INTERVAL ${numeroSalvo} DAY;
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTempoFalhas(numeroSalvo) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    if (numeroSalvo == 0) {
        var instrucaoSql = `
    SELECT captura, dataCaptura FROM captura WHERE fkAuxComponente = 25;
    `;
    } else {
        var instrucaoSql = `
        SELECT captura, dataCaptura 
    FROM captura 
    WHERE fkAuxComponente = 25 
    AND dataCaptura >= NOW() - INTERVAL ${numeroSalvo} DAY;
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarGraficoLatencia(numeroSalvo) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    if (numeroSalvo == 0) {
        var instrucaoSql = `
    SELECT captura, dataCaptura FROM captura WHERE fkAuxComponente = 20;
    `;
    } else {
        var instrucaoSql = `
        SELECT captura, dataCaptura 
    FROM captura 
    WHERE fkAuxComponente = 20 
    AND dataCaptura >= NOW() - INTERVAL ${numeroSalvo} DAY;
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarGraficoTrafego(numeroSalvo) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    if (numeroSalvo == 0) {
        var instrucaoSql = `
    SELECT captura, dataCaptura FROM captura WHERE fkAuxComponente = 27;
    `;
    } else {
        var instrucaoSql = `
        SELECT captura, dataCaptura 
    FROM captura 
    WHERE fkAuxComponente = 27 
    AND dataCaptura >= NOW() - INTERVAL ${numeroSalvo} DAY;
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    puxarPacotesPerdidos,
    puxarInatividade,
    puxarTempoFalhas,
    puxarGraficoLatencia,
    puxarGraficoTrafego
}