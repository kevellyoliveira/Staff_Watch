var database = require("../database/config");

function buscarRam(fkEmpresa){
    var instrucaoSql = `select modelo, fkComputador, equipe.nome from captura join computador as c on c.idComputador = captura.fkComputador join equipe on equipe.idEquipe = c.fkEquipe
    WHERE equipe.fkEmpresa = 1 AND captura.fkComponente = 2;`
   
       console.log("Executando a instrução SQL: \n" + instrucaoSql);
       return database.executar(instrucaoSql);
}


module.exports = {
    buscarRam
}