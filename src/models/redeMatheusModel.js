var database = require("../database/config");

function buscarPacotes() {

    // Para o comportamento dos gráficos das equipes e dos esquemas, foi criado este "select".
    var instrucaoSql = `SELECT 
    auxComponente.unidadeMedida AS tipo,
    captura.captura AS valor,
    captura.dataCaptura
FROM captura
JOIN auxComponente ON captura.fkAuxComponente = auxComponente.idAuxComponente
WHERE auxComponente.unidadeMedida IN ('pacoteEnviados', 'pacoteRecebidos');`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPacotes
}
