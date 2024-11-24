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
    var instrucaoSql = ` SELECT c.idComputador,c.status,c.fkEquipe, c.fkEmpresa, c.fkFuncionario, f.nome AS nomeFuncionario, e.nome AS nomeEquipe
            FROM computador c
            JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
            JOIN equipe e ON c.fkEquipe = e.idEquipe 
            where f.fkCargo = 4 and c.fkEmpresa = ${fkEmpresa} order by status;`;
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
    var instrucaoSql = `select a.tipoAlerta, ca.dataCaptura, ca.captura, aux.idAuxComponente, co.nome AS nomeComponente, aux.descricao, maq.idComputador
            from captura ca
            right join alerta a on a.fkCaptura = ca.idCaptura
            join componente co on co.idComponente = ca.fkComponente
            join auxcomponente aux on aux.idAuxComponente = ca.fkAuxComponente
            join computador maq on maq.idComputador = ca.fkComputador
            where maq.fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function equipes(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function equipes()");
    var instrucaoSql = `select maq.fkEquipe as equipe, co.nome as componente, count(a.idAlerta) as qtdAlerta 
                from componente co 
                left join captura ca on ca.fkComponente = co.idComponente 
                left join alerta a on a.fkCaptura = ca.idCaptura 
                left join computador maq on maq.idComputador = ca.fkComputador 
                where maq.fkEmpresa = ${fkEmpresa}
                group by maq.fkEquipe, co.nome order by maq.fkEquipe, co.nome;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//Listar a máquina buscaad
function buscar(fkEmpresa, idComputador) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscar()");
    var instrucaoSql = ` SELECT c.idComputador,c.status,c.fkEquipe, c.fkEmpresa, c.fkFuncionario, f.nome AS nomeFuncionario, e.nome AS nomeEquipe
            FROM computador c
            JOIN funcionario f ON c.fkFuncionario = f.idFuncionario
            JOIN equipe e ON c.fkEquipe = e.idEquipe 
            where f.fkCargo = 4 and c.fkEmpresa = ${fkEmpresa} and c.idComputador = ${idComputador} order by status;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    gerarGraficoTempoReal,
    obterDadosGrafico,
    listar,
    listarAlertas,
    historico,
    equipes,
    buscar
};
