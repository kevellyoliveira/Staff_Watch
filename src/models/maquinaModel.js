const { cadastrarComponente } = require("../controllers/maquinaController");
var database = require("../database/config");

//  function buscarUsuario(idUsuario, idQuiz) {

//    var instrucaoSql = `SELECT * FROM pontuacao WHERE fkUsuario = ${idUsuario} and idQuiz = ${idQuiz};`;

//    console.log("Executando a instrução SQL: \n" + instrucaoSql);
//    return database.executar(instrucaoSql);
//  }


function cadastrar(idEquipe, idFuncionario, token, fkEmpresa) {

    // Validação do token
    var validarToken = `SELECT token FROM token WHERE token = "${token}" AND fkEmpresa = ${fkEmpresa};`;

    console.log("Executando a instrução SQL: \n" + validarToken);
    
    // Executar a consulta de validação de token
    return database.executar(validarToken)
        .then((resultado) => {
            if (resultado.length === 0) {
                throw new Error("Token inválido ou não encontrado.");
            }

            // Inserção na tabela computador
            var instrucaoSqlFuncionario = `INSERT INTO computador (status, fkEquipe, fkEmpresa, fkFuncionario) VALUES (default, ${idEquipe}, ${fkEmpresa}, ${idFuncionario});`;

            console.log("Executando a instrução SQL para inserir computador:\n" + instrucaoSqlFuncionario);
            
            return database.executar(instrucaoSqlFuncionario);
        })
        .catch((erro) => {
            console.error("Erro durante o cadastro:", erro);
            throw erro; // Propaga o erro para ser tratado no nível superior
        });
}

function atualizar(idEquipe, token, fkEmpresa) {

  // Validação do token
  var validarToken = `SELECT token FROM Token WHERE token = "${token}" AND fkEmpresa = ${fkEmpresa};`;

  console.log("Executando a instrução SQL: \n" + validarToken);
  
  // Executar a consulta de validação de token
  return database.executar(validarToken)
      .then((resultado) => {
          if (resultado.length === 0) {
              throw new Error("Token inválido ou não encontrado.");
          }

          // NÃO ESQUECER DE MUDAR AQUI
          var instrucaoSqlFuncionario = `UPDATE VALUES (${idEquipe}, ${fkEmpresa});`;

          console.log("Executando a instrução SQL para inserir computador:\n" + instrucaoSqlFuncionario);
          
          return database.executar(instrucaoSqlFuncionario);
      })
      .catch((erro) => {
          console.error("Erro durante o cadastro:", erro);
          throw erro; // Propaga o erro para ser tratado no nível superior
      });
}


function listarEquipe(fkEmpresa) {

  var instrucaoSql = `select idEquipe , nome, setor from equipe where fkEmpresa = ${fkEmpresa} 
  order by setor desc;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function cadastrarEquipe(nomeEquipe, setorEquipe, fkEmpresa) {

  var instrucaoSql = `insert into equipe (nome, setor, fkEmpresa) values ('${nomeEquipe}', '${setorEquipe}', ${fkEmpresa});`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function removerEquipe(idEquipe) {

  var instrucaoSql = `delete from equipe where idEquipe = ${idEquipe};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


//Listar todas as máquinas

function listar(fkEmpresa) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucaoSql = `
  SELECT 
    idComputador,
    status,
    fkEquipe,
    fkEmpresa,
    fkFuncionario,
    nomeFuncionario,
    nomeEquipe
FROM view_computador_funcionario_equipe
WHERE fkEmpresa = ${fkEmpresa}
 `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  // buscarUsuario,
  listar,
  cadastrar,
  atualizar,
  cadastrarEquipe,
  removerEquipe,
  listarEquipe
}
