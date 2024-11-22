var database = require("../database/config");

function listarEnderecos(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
    SELECT 
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
    AND captura.fkComponente = 4
GROUP BY 
    captura.modelo, captura.fkComputador, equipe.nome;
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

function maquinasBuscarCpu(fkComponente) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
    SELECT COUNT(DISTINCT fkComputador) AS quantidade_maquinas_com_alertas
FROM alerta AS a
JOIN captura AS c ON a.fkCaptura = c.idCaptura where fkComponente = 4; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function funcaoGeral(fkComponente) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
    SELECT 
    captura.fkComputador AS idComputador,
    CASE 
        WHEN captura.fkComponente = 1 THEN 
            CONCAT(COUNT(alerta.idAlerta), ' alertas relacionados à Rede na máquina ', captura.fkComputador)
        WHEN captura.fkComponente = 2 THEN 
            CONCAT(COUNT(alerta.idAlerta), ' alertas relacionados à Memória na máquina ', captura.fkComputador)
        WHEN captura.fkComponente = 3 THEN 
            CONCAT(COUNT(alerta.idAlerta), ' alertas relacionados ao Disco na máquina ', captura.fkComputador)
        WHEN captura.fkComponente = 4 THEN 
            CONCAT(COUNT(alerta.idAlerta), ' alertas relacionados à CPU na máquina ', captura.fkComputador)
        ELSE 
            CONCAT(COUNT(alerta.idAlerta), ' alertas de componente desconhecido na máquina ', captura.fkComputador)
    END AS mensagemAlerta
FROM 
    alerta
JOIN 
    captura ON alerta.fkCaptura = captura.idCaptura
GROUP BY 
    captura.fkComputador, captura.fkComponente
ORDER BY 
captura.fkComputador; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarEnderecos,
    numerosBuscar,
    maquinasBuscarCpu,
    funcaoGeral
}