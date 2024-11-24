var database = require("../database/config");

// function do atualizar dados
// function gerarGraficoTempoReal(idComputador, idComponente) {
function gerarGraficoTempoReal(fkEmpresa, idComponente, idComputador) {
    console.log(`estamos na model em gerarGraficoTempoReal e o idComponente é: ${idComponente}`)

    if (idComponente == 1) {
        var instrucaoSql = `select 
                (select captura from captura 
                where fkComponente = 1 and fkComputador = 1 and fkAuxComponente = 4
                limit 1) as pctRec,
                captura as pctEnv, 
                time(dataCaptura) as dataCaptura, modelo, fkComputador, fkEmpresa
            from captura
            join computador co on captura.fkComputador = co.idComputador
            where fkComponente = 1 and fkAuxComponente = 5 and
            fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador}
            order by idCaptura desc limit 1;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } else if (idComponente == 2) {
        var instrucaoSql = `select ca.captura, time(ca.dataCaptura) as dataCaptura, ca.modelo, fkComputador, fkEmpresa
                    from captura ca
                    join computador co on ca.fkComputador = co.idComputador
                    where fkComponente = 2 and fkAuxComponente = 6 and 
                    fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador}
                    order by idCaptura desc limit 1;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } else if (idComponente == 3) {
        var instrucaoSql = `select ca.captura, time(ca.dataCaptura) as dataCaptura, ca.modelo, fkComputador, fkEmpresa
                        from captura ca
                        join computador co on ca.fkComputador = co.idComputador
                        where fkComponente = 3 and fkAuxComponente = 11 and 
                        fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador}
                        order by idCaptura desc limit 1;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } else if (idComponente == 4) {
        var instrucaoSql = `select ca.captura, time(ca.dataCaptura) as dataCaptura, ca.modelo, fkComputador, fkEmpresa
                        from captura ca
                        join computador co on ca.fkComputador = co.idComputador
                        where ca.fkComponente = 4 and ca.fkAuxComponente = 12 and 
                        fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador}
                        order by idCaptura desc limit 1;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
}

function obterDadosGrafico(fkEmpresa, idComponente, idComputador) {
    console.log(`estamos na model em obterDadosGrafico e o idComponente é: ${idComponente}`)

    if (idComponente == 1) {
        var instrucaoSql = `select 
                (select captura from captura 
                where fkComponente = 1 and fkComputador = 1 and fkAuxComponente = 4
                limit 1) as pctRec,
                captura as pctEnv, 
                time(dataCaptura) as dataCaptura, modelo, fkComputador, fkEmpresa
            from captura
            join computador co on captura.fkComputador = co.idComputador
            where fkComponente = 1 and fkAuxComponente = 5 and
            fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador}
            order by idCaptura limit 30;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
    if (idComponente == 2) {
        var instrucaoSql = `select ca.captura, time(ca.dataCaptura) as dataCaptura, ca.modelo, ca.fkComputador, co.fkEmpresa
                    from captura ca
                    join computador co on ca.fkComputador = co.idComputador
                    where ca.fkComponente = 2 and ca.fkAuxComponente = 6 and 
                    fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador}
                    order by dataCaptura limit 30;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
    if (idComponente == 3) {
        var instrucaoSql = `select ca.captura, time(ca.dataCaptura) as dataCaptura, ca.modelo, ca.fkComputador, co.fkEmpresa
                    from captura ca
                    join computador co on ca.fkComputador = co.idComputador
                    where ca.fkComponente = 3 and ca.fkAuxComponente = 11 and 
                    fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador}
                    order by dataCaptura limit 30;`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
    if (idComponente == 4) {
        var instrucaoSql = `select ca.captura, time(ca.dataCaptura) as dataCaptura, ca.modelo, ca.fkComputador, co.fkEmpresa
                    from captura ca
                    join computador co on ca.fkComputador = co.idComputador
                    where ca.fkComponente = 4 and ca.fkAuxComponente = 12 and 
                    fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador}
                    order by dataCaptura limit 30;`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }
}

//Listar todas as máquinas
function listar(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    SELECT * FROM view_computador_funcionario_equipe WHERE fkEmpresa = ${fkEmpresa}
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarAlertas(fkEmpresa, idComputador) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarAlertas()");
    var instrucaoSql = `
    select * from view_alertaMaquina where fkEmpresa = ${fkEmpresa};
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function historico(fkEmpresa, idComputador) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function historico()");
    var instrucaoSql = `SELECT 
                    a.tipoAlerta,
                    ca.dataCaptura,
                    aux.idAuxComponente,
                    co.nome AS nomeComponente,
                    ca.captura,
                    aux.descricao,
                    maq.idComputador
            FROM captura ca
            RIGHT JOIN alerta a ON a.fkCaptura = ca.idCaptura
            JOIN componente co ON co.idComponente = ca.fkComponente
            JOIN auxcomponente aux ON aux.idAuxComponente = ca.fkAuxComponente
            JOIN computador maq ON maq.idComputador = ca.fkComputador
            WHERE maq.fkEmpresa = ${fkEmpresa} 
            AND fkComputador = ${idComputador};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    gerarGraficoTempoReal,
    obterDadosGrafico,
    listar,
    listarAlertas,
    historico
};
