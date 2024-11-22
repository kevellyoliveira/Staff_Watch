var database = require("../database/config");

function buscarPacotes(fkEmpresa) {

    // Para o comportamento dos gráficos das equipes e dos esquemas, foi criado este "select".
    var instrucaoSql = ` SELECT 
    captura.modelo,
    captura.fkComputador,
    equipe.nome,
    COUNT(alerta.idAlerta) AS quantidade_alertas
FROM 
    captura
JOIN 
    computador AS c ON c.idComputador = captura.fkComputador
JOIN 
    equipe ON equipe.idEquipe = c.fkEquipe
LEFT JOIN 
    alerta ON alerta.fkCaptura = captura.idCaptura
WHERE 
    equipe.fkEmpresa = 1 
    AND captura.fkComponente = 1
GROUP BY 
    captura.modelo, captura.fkComputador, equipe.nome;;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function numerosBuscarRede(fkComponente) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
    select count(*) as quantidade_alertas from alerta as a join captura as c on a.fkCaptura = c.idCaptura where fkComponente = 1; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function maquinasBuscarRede(fkComponente) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
    SELECT COUNT(DISTINCT fkComputador) AS quantidade_maquinas_com_alertas
FROM alerta AS a
JOIN captura AS c ON a.fkCaptura = c.idCaptura where fkComponente = 1; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarPacotes,
    numerosBuscarRede,
    maquinasBuscarRede
}
