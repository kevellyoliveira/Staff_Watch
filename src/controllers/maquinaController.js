var maquinaModel = require("../models/maquinaModel");

// function buscarUsuario(req, res) {
//   var idUsuario = req.params.idUsuario;

//   maquinaModel.buscarUsuario(idUsuario).then((resultado) => {
//     if (resultado.length > 0) {
//       res.status(200).json(resultado);
//     } else {
//       res.status(204).json([]);
//     }
//   }).catch(function (erro) {
//     console.log(erro);
//     console.log("Houve um erro ao buscar o usuário: ", erro.sqlMessage);
//     res.status(500).json(erro.sqlMessage);
//   });
// }

// essa é a função de cadastrar novas máquinas em uma equipe;
function cadastrar(req, res) {
  var idEquipe = req.body.idEquipeServer;
  var idFuncionario = req.body.idFuncionarioServer;
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
    maquinaModel.cadastrar(idEquipe, idFuncionario, token, fkEmpresa)
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

function atualizar(req, res) {
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

function deletar(req, res) {
  var idComputador = req.params.idComputador;

  maquinaModel.deletar(idComputador)
      .then(
          function (resultado) {
              res.json(resultado);
          }
      )
      .catch(
          function (erro) {
              console.log(erro);
              console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
          }
      );
}


function atualizarMaquina(req, res) {
  var idComputador = req.params.idComputador;

  maquinaModel.atualizarMaquina(idComputador)
      .then(
          function (resultado) {
              res.json(resultado);
          }
      )
      .catch(
          function (erro) {
              console.log(erro);
              console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
          }
      );
}




function listarEquipe(req, res) {
  // var nomeComponente = req.body.nomeComponenteServer;
  var fkEmpresa = req.params.fkEmpresa;

  // if (nomeComponente == undefined) {
  //   res.status(400).send("nomeComponente está undefined!");}
  if (fkEmpresa == undefined) {
    res.status(400).send("fkEmpresa está undefined!");
  }

   else {
    maquinaModel.listarEquipe(fkEmpresa)
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

   

function cadastrarEquipe(req, res) {
  // var nomeComponente = req.body.nomeComponenteServer;
  var nomeEquipe = req.body.nomeEquipeServer;
  var setorEquipe = req.body.setorEquipeServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  // if (nomeComponente == undefined) {
  //   res.status(400).send("nomeComponente está undefined!");}
  if (nomeEquipe == undefined) {
    res.status(400).send("nomeEquipe está undefined!");
  }if (setorEquipe == undefined) {
    res.status(400).send("setorEquipe está undefined!");
  }if (fkEmpresa == undefined) {
    res.status(400).send("fkEmpresa está undefined!");
  }


   else {
    maquinaModel.cadastrarEquipe(nomeEquipe, setorEquipe, fkEmpresa)
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

function removerEquipe(req, res) {
  // var nomeComponente = req.body.nomeComponenteServer;
  var idEquipe = req.body.idEquipeServer;
  

  // if (nomeComponente == undefined) {
  //   res.status(400).send("nomeComponente está undefined!");}
  if (idEquipe == undefined) {
    res.status(400).send("idEquipe está undefined!");
  }

   else {
    maquinaModel.removerEquipe(idEquipe)
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

function atualizarEquipe(req, res) {
  // var nomeComponente = req.body.nomeComponenteServer;
  var idEquipe = req.body.idEquipeServer;
  var nomeEquipe = req.body.nomeEquipeServer;
  var setorEquipe = req.body.setorEquipeServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  // if (nomeComponente == undefined) {
  //   res.status(400).send("nomeComponente está undefined!");}
  if (nomeEquipe == undefined) {
    res.status(400).send("nomeEquipe está undefined!");
  }if (setorEquipe == undefined) {
    res.status(400).send("setorEquipe está undefined!");
  }if (fkEmpresa == undefined) {
    res.status(400).send("fkEmpresa está undefined!");
  } if (idEquipe == undefined) {
    res.status(400).send("idEquipe está undefined!");
  }


   else {
    maquinaModel.atualizarEquipe(nomeEquipe, setorEquipe, fkEmpresa, idEquipe)
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

function removerEquipe(req, res) {
  // var nomeComponente = req.body.nomeComponenteServer;
  var idEquipe = req.body.idEquipeServer;
  

  // if (nomeComponente == undefined) {
  //   res.status(400).send("nomeComponente está undefined!");}
  if (idEquipe == undefined) {
    res.status(400).send("idEquipe está undefined!");
  }

   else {
    maquinaModel.removerEquipe(idEquipe)
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




//Listando todas as máquinas
function listar(req, res) {
  const fkEmpresa = req.params.fkEmpresa; // Extrai o ID da empresa dos parâmetros da URL
  maquinaModel.listar(fkEmpresa).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!");
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  // buscarUsuario,
  cadastrar,
  atualizar,
  deletar,
  atualizarMaquina,
  cadastrarEquipe,
  removerEquipe,
  listarEquipe,
  listar,
  atualizarEquipe
}