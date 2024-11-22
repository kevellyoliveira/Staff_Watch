var database = require("../database/config");

// function do atualizar dados
// function gerarGraficoTempoReal(idComputador, idComponente) {
    function gerarGraficoTempoReal(idComponente) {
        console.log(`estamos na model em gerarGraficoTempoReal e o idComponente é: ${idComponente}`)

    if (idComponente == 1) {
        var instrucaoSql = `select * from view_redeTempoReal limit 1;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    } else if (idComponente == 2) {
        var instrucaoSql = `select * from view_ramTempoReal limit 1;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    } else if (idComponente == 3) {
        var instrucaoSql = `select * from view_discoTempoReal limit 1;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    } else if (idComponente == 4) {
        var instrucaoSql = `select * from view_cpuTempoReal limit 1;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
}

function obterDadosGrafico(fkEmpresa, idComponente, idComputador) {
    console.log(`estamos na model em obterDadosGrafico e o idComponente é: ${idComponente}`)

    if (idComponente == 1) {
        var instrucaoSql = `select * from view_redeTempoReal where fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador};`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
    if (idComponente == 2) {
        var instrucaoSql = `select * from view_ramTempoReal where fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador};`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    } 
    if (idComponente == 3) {
        var instrucaoSql = `select * from view_discoTempoReal where fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador};`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
    if (idComponente == 4) {
        var instrucaoSql = `select * from view_cpuTempoReal where fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador};`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
}

//Listar todas as máquinas
function listar(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    SELECT * FROM view_computador_funcionario_equipe WHERE fkEmpresa = ${fkEmpresa}
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function listarAlertas(fkEmpresa, idComputador) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarAlertas()");
    var instrucaoSql = `
    select * from view_alertaMaquina where fkEmpresa = ${fkEmpresa};
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

module.exports = {
    gerarGraficoTempoReal,
    obterDadosGrafico,
    listar,
    listarAlertas
};
