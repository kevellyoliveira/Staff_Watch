var database = require("../database/config");

function listarEnderecos(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
       select fkComputador, fkEquipe, modelo.nome as modelo, funcionario.nome from modelo join funcionario on modelo.fkFuncionario = funcionario.idFuncionario where funcionario.fkEmpresa = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarEnderecos
}