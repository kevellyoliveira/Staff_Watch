var funcionarioModel = require("../models/funcionarioModel");

function cadastrar(req, res) {

    let nome = req.body.nomeServer
    let email = req.body.emailServer
    let idEquipe = req.body.idEquipeServer
    let token = req.body.tokenServer
    var fkEmpresa = req.body.fkEmpresaServer;

    console.log(`idEquipe: ${idEquipe} \n
        nome: ${nome} \n
        email: ${email} \n
        token: ${token} \n
        fkEmpresa: ${fkEmpresa}
        `)

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("O email está indefinido!");
    } else if (idEquipe == undefined) {
        res.status(403).send("O idEquipe está indefinido!");
    }  else if (token == undefined) {
        res.status(403).send("O token está indefinido!");
    } else if (fkEmpresa == undefined) {
        res.status(403).send("O fkEmpresa está indefinido!");
    } 
    else {
        funcionarioModel.cadastrar(nome, email, idEquipe, token, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o cadastro do funcionário: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}



function listar(req, res) {
    funcionarioModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    funcionarioModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function editar(req, res) {
    var idFuncionario = req.params.idFuncionario;  // Obtido da URL
    var idEquipe = req.body.idEquipe;  // Obtido do corpo da requisição
    var nome = req.body.nome;
    var email = req.body.email;

    funcionarioModel.editar(idEquipe,nome,email,idFuncionario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var idFuncionario = req.params.idFuncionario;

    funcionarioModel.deletar(idFuncionario)
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



module.exports = {
    listarPorUsuario,
    editar,
    deletar,
    cadastrar,
    listar,
}