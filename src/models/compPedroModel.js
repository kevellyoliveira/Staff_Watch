var database = require("../database/config");

function buscarAlertasEquipe(fkEmpresa,idComponente,tempo) {
    console.log(`estamos na model em buscarAlertasEquipe e o idComponente é: ${idComponente}`)

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
    c.dataCaptura BETWEEN DATE_SUB(CURDATE(), INTERVAL ${tempo} DAY) AND CURDATE()
GROUP BY 
    e.idEquipe, e.nome;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } else if (idComponente == 4) {
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
    emp.idEmpresa = ${fkEmpresa} 
    AND c.fkComponente = ${idComponente} 
    AND c.dataCaptura BETWEEN DATE_SUB(CURDATE(), INTERVAL ${tempo} DAY) AND CURDATE()
GROUP BY 
    e.idEquipe, e.nome;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } else if (idComponente == 2) {
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
    emp.idEmpresa = ${fkEmpresa} 
    AND c.fkComponente = ${idComponente} 
    AND c.dataCaptura BETWEEN DATE_SUB(CURDATE(), INTERVAL ${tempo} DAY) AND CURDATE()
GROUP BY 
    e.idEquipe, e.nome;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } else if (idComponente == 3) {
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
    emp.idEmpresa = ${fkEmpresa} 
    AND c.fkComponente = ${idComponente} 
    AND c.dataCaptura BETWEEN DATE_SUB(CURDATE(), INTERVAL ${tempo} DAY) AND CURDATE()
GROUP BY 
    e.idEquipe, e.nome;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
}

function gerarGraficoCpu(fkEquipe,fkEmpresa, tempo) {

    var instrucaoSql = `SELECT 
    cap.captura,
    DATE_FORMAT(cap.dataCaptura, '%d-%m-%Y') AS dataCaptura
FROM captura cap
JOIN auxComponente aux ON cap.fkAuxComponente = aux.idAuxComponente
JOIN computador pc ON cap.fkComputador = pc.idComputador
JOIN equipe eqp ON pc.fkEquipe = eqp.idEquipe
JOIN empresa emp ON pc.fkEmpresa = emp.idEmpresa
WHERE  
    cap.fkAuxComponente = 12 AND 
    pc.fkEquipe = ${fkEquipe} AND  
    pc.fkEmpresa= ${fkEmpresa} AND  
    dataCaptura BETWEEN DATE_SUB(CURDATE(), INTERVAL ${tempo} DAY) AND CURDATE();`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function gerarGraficoRam(fkEquipe,fkEmpresa, tempo) {

    var instrucaoSql = `SELECT 
    cap.captura,
    DATE_FORMAT(cap.dataCaptura, '%d-%m-%Y') AS dataCaptura
FROM captura cap
JOIN auxComponente aux ON cap.fkAuxComponente = aux.idAuxComponente
JOIN computador pc ON cap.fkComputador = pc.idComputador
JOIN equipe eqp ON pc.fkEquipe = eqp.idEquipe
JOIN empresa emp ON pc.fkEmpresa = emp.idEmpresa
WHERE  
    cap.fkAuxComponente = 8 AND 
    pc.fkEquipe = ${fkEquipe} AND  
    pc.fkEmpresa= ${fkEmpresa} AND  
    dataCaptura BETWEEN DATE_SUB(CURDATE(), INTERVAL ${tempo} DAY) AND CURDATE();`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function gerarGraficoDisco1(fkEquipe,fkEmpresa, tempo) {

    var instrucaoSql = `SELECT 
    cap.fkAuxComponente,
    cap.captura,
    DATE_FORMAT(cap.dataCaptura, '%d-%m-%Y') AS dataCaptura
FROM captura cap
JOIN auxComponente aux ON cap.fkAuxComponente = aux.idAuxComponente
JOIN computador pc ON cap.fkComputador = pc.idComputador
JOIN equipe eqp ON pc.fkEquipe = eqp.idEquipe
JOIN empresa emp ON pc.fkEmpresa = emp.idEmpresa
WHERE  
    cap.fkAuxComponente IN (22, 23) AND  
    pc.fkEquipe = ${fkEquipe} AND  
    pc.fkEmpresa = ${fkEmpresa} AND  
    dataCaptura BETWEEN DATE_SUB(CURDATE(), INTERVAL ${tempo} DAY) AND CURDATE(); `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function gerarGraficoDisco2(fkEquipe,fkEmpresa, tempo) {

    var instrucaoSql = `SELECT 
    cap.fkAuxComponente,
    cap.captura,
    DATE_FORMAT(cap.dataCaptura, '%d-%m-%Y') AS dataCaptura
FROM captura cap
JOIN auxComponente aux ON cap.fkAuxComponente = aux.idAuxComponente
JOIN computador pc ON cap.fkComputador = pc.idComputador
JOIN equipe eqp ON pc.fkEquipe = eqp.idEquipe
JOIN empresa emp ON pc.fkEmpresa = emp.idEmpresa
WHERE  
    cap.fkAuxComponente IN (24, 25) AND  
    pc.fkEquipe = ${fkEquipe} AND  
    pc.fkEmpresa = ${fkEmpresa} AND  
    dataCaptura BETWEEN DATE_SUB(CURDATE(), INTERVAL ${tempo} DAY) AND CURDATE();`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarAlertas(fkEquipe, fkEmpresa, tempo, componente) {


    if(componente == 1){
        var instrucaoSql = `SELECT 
    alerta.idAlerta AS tipoAlerta,
    componente.nome AS nomeComponente,
    auxComponente.unidadeMedida AS descricaoAuxComponente
FROM 
    alerta
INNER JOIN captura ON alerta.fkCaptura = captura.idCaptura
INNER JOIN componente ON captura.fkComponente = componente.idComponente
INNER JOIN computador ON captura.fkComputador = computador.idComputador
INNER JOIN auxComponente ON captura.fkAuxComponente = auxComponente.idAuxComponente
inner JOIN computador pc ON captura.fkComputador = pc.idComputador
inner JOIN equipe eqp ON pc.fkEquipe = eqp.idEquipe
inner JOIN empresa emp ON pc.fkEmpresa = emp.idEmpresa
WHERE 
    computador.fkEquipe = ${fkEquipe}
    AND computador.fkEmpresa = ${fkEmpresa}
    AND captura.dataCaptura BETWEEN DATE_SUB(CURDATE(), INTERVAL ${tempo} DAY) AND CURDATE();`;
    }
    else{

        var instrucaoSql = `SELECT 
        alerta.idAlerta AS tipoAlerta,
        componente.nome AS nomeComponente,
        auxComponente.unidadeMedida AS descricaoAuxComponente
    FROM 
        alerta
    INNER JOIN captura ON alerta.fkCaptura = captura.idCaptura
    INNER JOIN componente ON captura.fkComponente = componente.idComponente
    INNER JOIN computador ON captura.fkComputador = computador.idComputador
    INNER JOIN auxComponente ON captura.fkAuxComponente = auxComponente.idAuxComponente
    inner JOIN computador pc ON captura.fkComputador = pc.idComputador
    inner JOIN equipe eqp ON pc.fkEquipe = eqp.idEquipe
    inner JOIN empresa emp ON pc.fkEmpresa = emp.idEmpresa
    WHERE 
        computador.fkEquipe = ${fkEquipe}
        AND computador.fkEmpresa = ${fkEmpresa}
        AND componente.idComponente = ${componente}
        AND captura.dataCaptura BETWEEN DATE_SUB(CURDATE(), INTERVAL ${tempo} DAY) AND CURDATE();`;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarAlertasEquipe,
    gerarGraficoCpu,
    gerarGraficoRam,
    gerarGraficoDisco1,
    gerarGraficoDisco2,
    listarAlertas
};
