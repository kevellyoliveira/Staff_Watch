var database = require("../database/config");

function buscarAlertasEquipe(fkEmpresa,idComponente,tempo ) {
    console.log(`estamos na model em gerarGraficoTempoReal e o idComponente é: ${idComponente}`)

    if (idComponente == 1) {
        var instrucaoSql = `SELECT 
    e.nome AS nomeEquipe,
    COUNT(a.idAlerta) AS totalAlertas
FROM 
    alerta a
JOIN 
    captura c ON a.fkCaptura = c.idCaptura
JOIN 
    computador comp ON c.fkComputador = comp.idComputador
JOIN 
    equipe e ON comp.fkEquipe = e.idEquipe
JOIN 
    empresa emp ON e.fkEmpresa = emp.idEmpresa
WHERE 
    emp.idEmpresa = ${fkEmpresa} AND  
    DATE( date_sub(now(), interval ${tempo} day ))
GROUP BY 
    e.idEquipe, e.nome;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } else if (idComponente == 12) {
        var instrucaoSql =  `SELECT 
        e.nome AS nomeEquipe,
        COUNT(a.idAlerta) AS totalAlertas
    FROM 
        alerta a
    JOIN 
        captura c ON a.fkCaptura = c.idCaptura
    JOIN 
        computador comp ON c.fkComputador = comp.idComputador
    JOIN 
        equipe e ON comp.fkEquipe = e.idEquipe
    JOIN 
        empresa emp ON e.fkEmpresa = emp.idEmpresa
    WHERE 
        emp.idEmpresa = ${fkEmpresa} and 
        c.fkAuxComponente = ${idComponente} AND  
    DATE( date_sub(now(), interval ${tempo} day ))
    GROUP BY 
        e.idEquipe, e.nome;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } else if (idComponente == 8) {
        var instrucaoSql = `SELECT 
        e.nome AS nomeEquipe,
        COUNT(a.idAlerta) AS totalAlertas
    FROM 
        alerta a
    JOIN 
        captura c ON a.fkCaptura = c.idCaptura
    JOIN 
        computador comp ON c.fkComputador = comp.idComputador
    JOIN 
        equipe e ON comp.fkEquipe = e.idEquipe
    JOIN 
        empresa emp ON e.fkEmpresa = emp.idEmpresa
    WHERE 
        emp.idEmpresa = ${fkEmpresa} and 
        c.fkAuxComponente = ${idComponente} AND  
    DATE( date_sub(now(), interval ${tempo} day ))
    GROUP BY 
        e.idEquipe, e.nome;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } else if (idComponente == 4) {
        var instrucaoSql = `SELECT 
		e.idEquipe as idEquipe,
        e.nome AS nomeEquipe,
        COUNT(a.idAlerta) AS totalAlertas
    FROM 
        alerta a
    JOIN 
        captura c ON a.fkCaptura = c.idCaptura
    JOIN 
        computador comp ON c.fkComputador = comp.idComputador
    JOIN 
        equipe e ON comp.fkEquipe = e.idEquipe
    JOIN 
        empresa emp ON e.fkEmpresa = emp.idEmpresa
    WHERE 
        emp.idEmpresa = ${fkEmpresa} AND 
        c.fkComponente = ${idComponente} AND  
    DATE( date_sub(now(), interval ${tempo} day ))
    GROUP BY 
        e.idEquipe, e.nome;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
}

function gerarGraficoCpu(fkEquipe,fkEmpresa, tempo) {

    var instrucaoSql = `SELECT 
    cap.captura,
    cap.dataCaptura
FROM captura cap
JOIN auxComponente aux ON cap.fkAuxComponente = aux.idAuxComponente
JOIN computador pc ON cap.fkComputador = pc.idComputador
JOIN equipe eqp ON pc.fkEquipe = eqp.idEquipe
JOIN empresa emp ON pc.fkEmpresa = emp.idEmpresa
WHERE  
    cap.fkAuxComponente = 12 AND 
    pc.fkEquipe = ${fkEquipe} AND  
    pc.fkEmpresa= ${fkEmpresa} AND  
    DATE( date_sub(now(), interval ${tempo} day ));`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function gerarGraficoRam(fkEquipe,fkEmpresa, tempo) {

    var instrucaoSql = `SELECT 
    cap.captura,
    cap.dataCaptura
FROM captura cap
JOIN auxComponente aux ON cap.fkAuxComponente = aux.idAuxComponente
JOIN computador pc ON cap.fkComputador = pc.idComputador
JOIN equipe eqp ON pc.fkEquipe = eqp.idEquipe
JOIN empresa emp ON pc.fkEmpresa = emp.idEmpresa
WHERE  
    cap.fkAuxComponente = 8 AND 
    pc.fkEquipe = ${fkEquipe} AND  
    pc.fkEmpresa= ${fkEmpresa} AND  
    DATE( date_sub(now(), interval ${tempo} day ));`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function gerarGraficoDisco1(fkEquipe,fkEmpresa, tempo) {

    var instrucaoSql = `SELECT 
    cap.captura,
    cap.dataCaptura
FROM captura cap
JOIN auxComponente aux ON cap.fkAuxComponente = aux.idAuxComponente
JOIN computador pc ON cap.fkComputador = pc.idComputador
JOIN equipe eqp ON pc.fkEquipe = eqp.idEquipe
JOIN empresa emp ON pc.fkEmpresa = emp.idEmpresa
WHERE  
    (cap.fkComponente = 20 and 21) AND 
    pc.fkEquipe = ${fkEquipe} AND  
    pc.fkEmpresa= ${fkEmpresa} AND  
    DATE( date_sub(now(), interval ${tempo} day ));`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function gerarGraficoDisco2(fkEquipe,fkEmpresa, tempo) {

    var instrucaoSql = `SELECT 
    cap.captura,
    cap.dataCaptura
FROM captura cap
JOIN auxComponente aux ON cap.fkAuxComponente = aux.idAuxComponente
JOIN computador pc ON cap.fkComputador = pc.idComputador
JOIN equipe eqp ON pc.fkEquipe = eqp.idEquipe
JOIN empresa emp ON pc.fkEmpresa = emp.idEmpresa
WHERE  
    (cap.fkComponente = 22 and 23) AND 
    pc.fkEquipe = ${fkEquipe} AND  
    pc.fkEmpresa= ${fkEmpresa} AND  
    DATE( date_sub(now(), interval ${tempo} day ));`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarAlertasEquipe,
    gerarGraficoCpu,
    gerarGraficoRam,
    gerarGraficoDisco1,
    gerarGraficoDisco2
};
