var database = require("../database/config");

function listarEnderecos(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
    select modelo, fkComputador, equipe.nome from captura join computador as c on c.idComputador = captura.fkComputador join equipe on equipe.idEquipe = c.fkEquipe
 WHERE equipe.fkEmpresa = 1 AND captura.fkComponente = 4;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function numerosBuscar(fkComponente) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
    select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura where fkComponente = 4; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




module.exports = {
    listarEnderecos,
    numerosBuscar
}