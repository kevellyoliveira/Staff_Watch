var aquarioModel = require("../models/aquarioModel");

function buscarUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  aquarioModel.buscarUsuario(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar o usuário: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

// essa é a função de cadastrar os pontos do usuário ao final do quiz;
function cadastrar(req, res) {
  var pontuacao = req.body.pontuacao;
  var idUsuario = req.body.idUsuario;
  var idQuiz = req.body.idQuiz;

  if (pontuacao == undefined) {
    res.status(400).send("pontuacao está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("idUsuario está undefined!");
  } else if (idQuiz == undefined) {
    res.status(400).send("idQuiz está undefined!");
  }
   else {
    aquarioModel.cadastrar(pontuacao, idUsuario, idQuiz)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarUsuario,
  cadastrar
}