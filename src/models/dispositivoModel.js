var database = require("../database/config");

// function do atualizar dados
// function gerarGraficoTempoReal(idComputador, idComponente) {
function gerarGraficoTempoReal(fkEmpresa, idComponente, idComputador) {
    console.log(`estamos na model em gerarGraficoTempoReal e o idComponente é: ${idComponente}`)

    if (idComponente == 1) {
        var instrucaoSql = `select 
                (select captura from captura 
                where fkComponente = 1 and fkComputador = ${idComputador} and fkAuxComponente = 20
                limit 1) as latencia,
                captura as pctPerd, 
                time(dataCaptura) as dataCaptura, modelo, fkComputador, fkEmpresa
            from captura
            join computador co on captura.fkComputador = co.idComputador
            where fkComponente = 1 and fkAuxComponente = 21 and
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
                where fkComponente = 1 and fkComputador = ${idComputador} and fkAuxComponente = 20
                limit 1) as latencia,
                captura as pctPerd, 
                time(dataCaptura) as dataCaptura, modelo, fkComputador, fkEmpresa
            from captura
            join computador co on captura.fkComputador = co.idComputador
            where fkComponente = 1 and fkAuxComponente = 20 and
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
                        select 
        c.idComputador, c.status, c.fkEquipe, c.fkFuncionario, 
        f.nome as nomeFuncionario, 
        e.nome as nomeEquipe, 
        a.tipoAlerta, 
        cap.dataCaptura, cap.captura, 
        aux.idAuxComponente, aux.unidadeMedida, 
        co.nome as nomeComponente 
        from computador c 
        join funcionario f on c.fkFuncionario = f.idFuncionario 
        join equipe e on c.fkEquipe = e.idEquipe 
        left join (
            select 
                a1.idAlerta, 
                a1.tipoAlerta, 
                a1.fkCaptura 
            from alerta a1 
            inner join (
                select 
                    cap.fkComputador, 
                    max(a.idAlerta) as ultimoAlerta 
                from alerta a 
                join captura cap on cap.idCaptura = a.fkCaptura 
                group by cap.fkComputador
            ) ultimosAlertas on a1.idAlerta = ultimosAlertas.ultimoAlerta
        ) a on exists (
            select 1 
            from captura cap2 
            where cap2.idCaptura = a.fkCaptura 
            and cap2.fkComputador = c.idComputador
        ) 
        left join captura cap on cap.idCaptura = a.fkCaptura 
        left join componente co on co.idComponente = cap.fkComponente 
        left join auxComponente aux on aux.idAuxComponente = cap.fkAuxComponente 
        where f.fkCargo = 4 and c.fkEmpresa = ${fkEmpresa}
        order by c.status, cap.dataCaptura desc;`;

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
            where maq.fkEmpresa = ${fkEmpresa} and fkComputador = ${idComputador} order by idCaptura desc;`;
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
    historico,
    equipes,
    buscar
};
