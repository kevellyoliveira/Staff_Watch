var database = require("../database/config");

// function do atualizar dados
function gerarGraficoTempoReal(idComputador, idComponente) {

    if (idComponente == 1) {
        var instrucaoSql = `select * from view_redeTempoReal;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    } else if (idComponente == 2) {
        var instrucaoSql = `select * from view_ramTempoReal;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    } else if (idComponente == 3) {
        var instrucaoSql = `select * from view_discoTempoReal;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    } else if (idComponente == 4) {
        var instrucaoSql = `select * from view_cpuTempoReal;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
    
}

module.exports = {
    gerarGraficoTempoReal
};
