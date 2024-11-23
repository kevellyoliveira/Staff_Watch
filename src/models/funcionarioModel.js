// const { abrirModal } = require("../controllers/funcionarioController");
//const { puxarDadosChamada } = require("../controllers/funcionarioController");
var database = require("../database/config");
// funcoes utilizadas =======================================================================================

function cadastrar(nome, email, telefone, idEquipe, fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. function cadastrar()")


    // Inserção na tabela funcionário
    var instrucaoSqlFuncionario = `insert into funcionario (Nome, Email, Telefone, fkEmpresa, fkEquipe, fkCargo) values
("${nome}", "${email}", "${telefone}", '${fkEmpresa}',' ${idEquipe}',4);`;

    console.log("Executando a instrução SQL para inserir funcionário:\n" + instrucaoSqlFuncionario);

    return database.executar(instrucaoSqlFuncionario)
        .catch((erro) => {
            console.error("Erro durante o cadastro:", erro);
            throw erro; // Propaga o erro para ser tratado no nível superior
        });
}






// funcoes nao utilizadas =======================================================================================

function listar(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    select idFuncionario, nome, email,
    status, fkEmpresa,
    fkEquipe,fkCargo
    from funcionario
    where fkEmpresa = ${fkEmpresa} AND status = 1
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarEquipe(fkEmpresa, fkEquipe) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    select idFuncionario, nome, email,
    status, fkEmpresa,
    fkEquipe,fkCargo
    from funcionario
    WHERE fkEmpresa = ${fkEmpresa} AND fkEquipe = ${fkEquipe} AND status = 1
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarEquipes(fkEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    select nome
    from equipe
    WHERE fkEmpresa = ${fkEmpresa} 
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucaoSql = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(fkEmpresa, nomeFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
        SELECT * FROM funcionario WHERE fkEmpresa = '${fkEmpresa}' AND nome LIKE CONCAT('%','${nomeFuncionario}', '%')
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function editar(idEquipe, nome, email, idFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ");
    var instrucaoSql = `
        UPDATE funcionario SET fkEquipe = '${idEquipe}', nome = '${nome}' , email = '${email}' WHERE idFuncionario = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idFuncionario

    );
    var instrucaoSql = `
       UPDATE funcionario SET status = 2 WHERE idFuncionario = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function abrirModal(idFuncionario) {

    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT * FROM chamada where fkFuncionario = ${1}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarDadosChamada(idFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT tempoEspera FROM chamada where fkFuncionario = ${1}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTempoChamada(idFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT tempoChamada FROM chamada where fkFuncionario = ${1}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalChamada(idFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT COUNT(*) chamadaRecebida FROM chamada WHERE fkFuncionario = ${1}; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalPerdida(idFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT COUNT(*) chamadaPerdida FROM chamada WHERE fkFuncionario = ${1} and chamadaPerdida = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalAtendida(idFuncionario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT COUNT(*) AS chamadaAtendida FROM chamada WHERE fkFuncionario = ${1} AND chamadaAtendida IN (2, 3);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



                                    // equipe

function puxarDadosEquipeChamada(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
   SELECT tempoEspera FROM chamada where fkEquipe = ${1}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTempoEquipeChamada(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT tempoChamada FROM chamada where fkEquipe = ${1}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalEquipeChamada(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
SELECT COUNT(*) chamadaRecebida FROM chamada WHERE fkEquipe = ${1};  `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalEquipePerdida(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
 SELECT COUNT(*) chamadaPerdida FROM chamada WHERE fkEquipe = ${1} and chamadaPerdida = 1; `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalEquipeAtendida(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
     SELECT COUNT(*) AS chamadaAtendida FROM chamada WHERE fkEquipe = ${1} AND chamadaAtendida IN (2, 3);`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function eficienciaEquipeChamada(fkEquipe){
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
     SELECT 
    COUNT(*) AS chamadaRecebida,
    COUNT(CASE WHEN chamadaAtendida IN (2, 3) THEN 1 END) AS chamadaAtendida
    FROM chamada
    WHERE fkFuncionario = ${1};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}





function plotarGrafico(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
   SELECT 
    COUNT(*) AS chamadaRecebida,
    COUNT(CASE WHEN chamadaAtendida IN (2, 3) THEN 1 END) AS chamadaAtendida
    FROM chamada
    WHERE fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log("GRAFICO PORFIRIO")
    return database.executar(instrucaoSql);
}


module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    cadastrar,
    editar,
    deletar,
    listarEquipe,
    listarEquipes,
    abrirModal,
    puxarDadosChamada,
    puxarTempoChamada,
    puxarTotalChamada,
    puxarTotalPerdida,
    puxarTotalAtendida,
    plotarGrafico,
    puxarDadosEquipeChamada,
    puxarTempoEquipeChamada,
    puxarTotalEquipeChamada,
    puxarTotalEquipePerdida,
    puxarTotalEquipeAtendida,
    eficienciaEquipeChamada
}
