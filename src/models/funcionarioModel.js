// const { abrirModal } = require("../controllers/funcionarioController");
//const { puxarDadosChamada } = require("../controllers/funcionarioController");
// const { filtrarTempoMedioEspera, filtrarTempoGrafico } = require("../controllers/funcionarioController");
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

function cadastroGerenteTI(nome, email, telefone, idEquipe, fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. function cadastrar()")


    // Inserção na tabela funcionário
    var instrucaoSqlFuncionario = `insert into funcionario (Nome, Email, Telefone, fkEmpresa, fkEquipe, fkCargo) values
("${nome}", "${email}", "${telefone}", '${fkEmpresa}',' ${idEquipe}',3);`;

    console.log("Executando a instrução SQL para inserir funcionário:\n" + instrucaoSqlFuncionario);

    return database.executar(instrucaoSqlFuncionario)
        .catch((erro) => {
            console.error("Erro durante o cadastro:", erro);
            throw erro; // Propaga o erro para ser tratado no nível superior
        });
}

function cadastroGerenteOp(nome, email, telefone, idEquipe, fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. function cadastrar()")


    // Inserção na tabela funcionário
    var instrucaoSqlFuncionario = `insert into funcionario (Nome, Email, Telefone, fkEmpresa, fkEquipe, fkCargo) values
("${nome}", "${email}", "${telefone}", '${fkEmpresa}',' ${idEquipe}',2);`;

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

function abrirModal(fkFuncionario) {

    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT * FROM chamada where fkFuncionario = ${fkFuncionario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarDadosChamada(idFunc) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT tempoEspera FROM chamada where fkFuncionario = ${idFunc}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTempoChamada(idFunc) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT tempoChamada FROM chamada where fkFuncionario = ${idFunc}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalChamada(idFunc) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT COUNT(*) chamadaRecebida FROM chamada WHERE fkFuncionario = ${idFunc}; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalPerdida(idFunc) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
            SELECT 
            (SELECT COUNT(*) FROM chamada WHERE fkFuncionario = ${idFunc} AND chamadaPerdida = 1) AS chamadasPerdidas,
            (SELECT COUNT(*) FROM chamada WHERE fkFuncionario = ${idFunc}) AS chamadasRecebidas
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalAtendida(idFunc) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT COUNT(*) AS chamadaAtendida FROM chamada WHERE fkFuncionario = ${idFunc} AND chamadaAtendida IN (2, 3);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function eficienciaChamada(idFunc) {
    console.log("Acessando model com fkFuncionario:");
    const instrucaoSql = `
    SELECT
    COUNT(*) AS chamadaRecebida,
        COUNT(CASE WHEN chamadaAtendida IN(2, 3) THEN 1 END) AS chamadaAtendida
        FROM chamada
        WHERE fkFuncionario = ${idFunc}
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// equipe

function puxarDadosEquipeChamada(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
   SELECT tempoEspera FROM chamada 
   INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
   where funcionario.fkEquipe = ${1}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTempoEquipeChamada(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT tempoChamada FROM chamada
    INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
     where funcionario.fkEquipe = ${1}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalEquipeChamada(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
SELECT COUNT(*) chamadaRecebida FROM chamada
 INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
    WHERE funcionario.fkEquipe = ${1}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalEquipePerdida(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
   SELECT COUNT(*) AS chamadaPerdida FROM chamada
    INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
    WHERE chamada.chamadaPerdida = 1
    AND funcionario.fkEquipe = ${1};`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalEquipeAtendida(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
     SELECT COUNT(*) AS chamadaAtendida FROM chamada
     INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
      WHERE funcionario.fkEquipe = ${1} AND chamadaAtendida IN(2, 3); `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function eficienciaEquipeChamada(fkEquipe) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
      SELECT
    COUNT(*) AS chamadaRecebida,
        COUNT(CASE WHEN chamadaAtendida IN(2, 3) THEN 1 END) AS chamadaAtendida
        FROM chamada
    INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
        WHERE funcionario.fkEquipe = ${1};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Empresa

function puxarDadosEmpresaChamada(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
   SELECT tempoEspera FROM chamada 
   INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
   where funcionario.fkEmpresa = ${1}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTempoEmpresaChamada(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT tempoChamada FROM chamada
    INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
     where funcionario.fkEmpresa = ${1}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalEmpresaChamada(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
SELECT COUNT(*) chamadaRecebida FROM chamada
 INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
    WHERE funcionario.fkEmpresa = ${1}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalEmpresaPerdida(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT COUNT(*) AS chamadaPerdida FROM chamada
    INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
    WHERE chamada.chamadaPerdida = 1
    AND funcionario.fkEmpresa = ${1};`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarTotalEmpresaAtendida(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
     SELECT COUNT(*) AS chamadaAtendida FROM chamada
     INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
      WHERE funcionario.fkEmpresa = ${1} AND chamadaAtendida IN(2, 3); `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function eficienciaEmpresaChamada(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
      SELECT
    COUNT(*) AS chamadaRecebida,
        COUNT(CASE WHEN chamadaAtendida IN(2, 3) THEN 1 END) AS chamadaAtendida
        FROM chamada
    INNER JOIN funcionario ON chamada.fkFuncionario = funcionario.idFuncionario
        WHERE funcionario.fkEmpresa = ${1};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Filtro

function filtrarTempoChamadaMedia(dataSelecionada, fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
   SELECT tempoChamada FROM chamada AS ch
WHERE dataCaptura >= ${dataSelecionada} 
  AND fkEmpresa = 1`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function filtrarTempoEficiencia(dataSelecionada, fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT
    COUNT(*) AS chamadaRecebida,
        COUNT(CASE WHEN chamadaAtendida IN(2, 3) THEN 1 END) AS chamadaAtendida
        FROM chamada
    WHERE dataCaptura >= ${dataSelecionada}
    AND fkEmpresa = 1;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function filtrarTempoMedioEspera(dataSelecionada, fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
   SELECT tempoEspera FROM chamada AS ch
   WHERE dataCaptura >= ${dataSelecionada} 
   AND fkEmpresa = 1`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function filtrarTempoChamadaPerdida(dataSelecionada, fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT COUNT(*) AS chamadaPerdida FROM chamada
    WHERE dataCaptura >= ${dataSelecionada} 
    AND fkEmpresa = 1`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function filtrarTempoGrafico(dataSelecionada, fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT
    COUNT(*) AS chamadaRecebida,
    COUNT(CASE WHEN chamadaAtendida IN(2, 3) THEN 1 END) AS chamadaAtendida
    FROM chamada
    WHERE dataCaptura >= ${dataSelecionada} 
    AND fkEmpresa = 1`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function plotarGrafico(fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT
    COUNT(*) AS chamadaRecebida,
        COUNT(CASE WHEN chamadaAtendida IN(2, 3) THEN 1 END) AS chamadaAtendida
    FROM chamada
    WHERE fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log("GRAFICO PORFIRIO")
    return database.executar(instrucaoSql);
}

function plotarGraficoFiltrado(dataSelecionada, fkEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function descurtir()");
    var instrucaoSql = `
    SELECT
    COUNT(*) AS chamadaRecebida,
    COUNT(CASE WHEN chamadaAtendida IN(2, 3) THEN 1 END) AS chamadaAtendida
    FROM chamada
    WHERE dataCaptura >= ${dataSelecionada} 
    AND fkEmpresa = 1`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
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
    eficienciaChamada,
    plotarGrafico,
    puxarDadosEquipeChamada,
    puxarTempoEquipeChamada,
    puxarTotalEquipeChamada,
    puxarTotalEquipePerdida,
    puxarTotalEquipeAtendida,
    eficienciaEquipeChamada,
    puxarDadosEmpresaChamada,
    puxarTempoEmpresaChamada,
    puxarTotalEmpresaChamada,
    puxarTotalEmpresaPerdida,
    puxarTotalEmpresaAtendida,
    eficienciaEmpresaChamada,
    filtrarTempoChamadaMedia,
    filtrarTempoEficiencia,
    filtrarTempoMedioEspera,
    filtrarTempoChamadaPerdida,
    filtrarTempoGrafico,
    plotarGraficoFiltrado,
    cadastroGerenteTI,
    cadastroGerenteOp,
}
