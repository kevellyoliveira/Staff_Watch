var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)


    var instrucaoSql = `
        SELECT idFuncionario, nome, email, fkEmpresa, fkCargo
        FROM funcionario WHERE email = '${email}' AND senha = MD5('${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)


    // .then((resultado) => {
    //     var fkEmpresa = resultado[0].fkEmpresa
    //     var instrucaoSqlValidarToken = `
    //         SELECT idToken FROM token WHERE token = "${token}" and fkEmpresa = ${fkEmpresa};
    //         `;
    //         console.log("Executando a instrução SQL para obter o token da empresa:\n" + instrucaoSqlValidarToken);
    //     return database.executar(instrucaoSqlValidarToken)
    // }).catch((erro) => {
    //     console.error("Erro durante a busca do token:", erro);
    //     throw erro;
    // });
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nomeEmp, cnpj, nomeRep, email, cargo, senha) {
    console.log("Iniciando o processo de cadastro:\n", nomeEmp, cnpj, nomeRep, email, cargo, senha);

    // Query para inserir os dados da empresa
    var instrucaoSqlEmpresa = `
        INSERT INTO empresa (NomeEmp, cnpj) 
        VALUES ('${nomeEmp}', '${cnpj}');
    `;

    console.log("Executando a instrução SQL para empresa:\n" + instrucaoSqlEmpresa);

    // Executa a query de inserção da empresa
    return database.executar(instrucaoSqlEmpresa)
        .then(() => {
            // Agora inserimos o cargo na tabela de cargos
            var instrucaoSqlCargo = `
            INSERT INTO cargo 
            VALUES (default, '${cargo}');`;
            console.log("Executando a instrução SQL para funcionário:\n" + instrucaoSqlCargo);
            return database.executar(instrucaoSqlCargo)
        })
        .then(() => {
            // Agora inserimos o cargo na tabela de cargos
            var instrucaoSqlObterIdCargo = `
            SELECT idCargo FROM cargo WHERE cargo = '${cargo}'`;
            console.log("Executando a instrução SQL para funcionário:\n" + instrucaoSqlObterIdCargo);
            return database.executar(instrucaoSqlObterIdCargo)
        })
        .then((resultado2) => {
            // Após inserir a empresa, obtemos o ID gerado
            var instrucaoSqlObterIdEmpresa = `
            SELECT idEmpresa FROM empresa WHERE NomeEmp = '${nomeEmp}'`;
            console.log("Executando a instrução SQL para obter o ID da empresa:\n" + instrucaoSqlObterIdEmpresa);
            return Promise.all([database.executar(instrucaoSqlObterIdEmpresa), resultado2]);
        })
        .then(([resultado, resultado2]) => {
            // Supondo que o resultado seja um array de linhas e a primeira linha contém o idEmpresa
            var idEmpresa = resultado[0].idEmpresa;
            var idCargo = resultado2[0].idCargo;

            // Agora inserimos o representante na tabela de funcionários
            var instrucaoSqlFuncionario = `
                INSERT INTO funcionario (nome, email, senha, fkCargo, status, fkEmpresa) 
                VALUES ('${nomeRep}', '${email}', MD5('${senha}'),${idCargo}, default, ${idEmpresa});
            `;
            console.log("Executando a instrução SQL para funcionário:\n" + instrucaoSqlFuncionario);
            return database.executar(instrucaoSqlFuncionario)
        })
        
        .catch((erro) => {
            console.error("Erro durante o cadastro:", erro);
            throw erro; // Para capturar e propagar o erro
        });
}

// function cadastrarComponente(fkEmpresa) {

//     var instrucaoSqlComponente = `insert into selecionadosParaMonitoramento values
//     (0, ${fkEmpresa}, 1),
//     (0, ${fkEmpresa}, 2),
//     (0, ${fkEmpresa}, 3),
//     (0, ${fkEmpresa}, 4),
//     (0, ${fkEmpresa}, 5);`;

//     console.log("Executando a instrução SQL: \n" + instrucaoSqlComponente);
//     return database.executar(instrucaoSqlComponente);
// }

module.exports = {
    autenticar,
    cadastrar,
    //    cadastrarComponente
    // consultar,
    // inserirPontos
};