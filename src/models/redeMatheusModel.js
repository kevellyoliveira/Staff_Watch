var database = require("../database/config");

function buscarPacotes(fkEmpresa) {

    // Para o comportamento dos gráficos das equipes e dos esquemas, foi criado este "select".
    var instrucaoSql = `select modelo, fkComputador, equipe.nome from captura join computador as c on c.idComputador = captura.fkComputador join equipe on equipe.idEquipe = c.fkEquipe
 WHERE equipe.fkEmpresa = 1 AND captura.fkComponente = 1;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarPacotes
}