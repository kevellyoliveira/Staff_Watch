var database = require("../database/config");

function buscarUsuario(idUsuario, idQuiz) {

  var instrucaoSql = `SELECT * FROM pontuacao WHERE fkUsuario = ${idUsuario} and idQuiz = ${idQuiz};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(pontuacao, idUsuario, idQuiz) {
  
  var instrucaoSql = `insert into pontuacao (fkUsuario, fkQuiz, pontos) values ( ${idUsuario}, ${idQuiz}, ${pontuacao});`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarUsuario,
  cadastrar
}
