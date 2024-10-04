var maquinaModel = require("../models/maquinaModel");

function buscarUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  maquinaModel.buscarUsuario(idUsuario).then((resultado) => {
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

// essa é a função de cadastrar novas máquinas em uma equipe;
function cadastrar(req, res) {
  var idEquipe = req.body.idEquipeServer;
  var token = req.body.tokenServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  if (idEquipe == undefined) {
    res.status(400).send("idEquipe está undefined!")
  } if (token == undefined) {
    res.status(400).send("token está undefined!");
  }if (fkEmpresa == undefined) {
    res.status(400).send("fkEmpresa está undefined!");
  }

   else {
    maquinaModel.cadastrar(idEquipe, token, fkEmpresa)
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