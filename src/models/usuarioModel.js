var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idFuncionario, nome, email
        FROM usuario WHERE email = '${email}' AND senha = MD5('${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nomeEmp, cnpj, nomeRep, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO empresa (nomeEmp, cnpj, nomeRep, email, senhaRep) VALUES 
        ('${nomeEmp}', '${cnpj}', '${nomeRep}', '${email}', MD5('${senha}'));
    `;

    var instrucaoSql1 = `
        SELECT idEmpresa FROM Empresa WHERE nomeEmp = ${nomeEmp};
    `;
    var instrucaoSql2 = `
        INSERT INTO funcionario (nome, email, senha, fkEmpresa) VALUES 
        ('${nomeRep}', '${email}', MD5('${senha}', ${instrucaoSql1})); `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, instrucaoSql1, instrucaoSql2);
}

module.exports = {
    autenticar,
    cadastrar,
    // consultar,
    // inserirPontos
};