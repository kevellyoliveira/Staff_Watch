var funcionarioModel = require("../models/funcionarioModel");

function cadastrar(req, res) {

    let nome = req.body.nomeServer
    let email = req.body.emailServer
    let idEquipe = req.body.idEquipeServer
    let token = req.body.tokenServer
    var fkEmpresa = req.body.fkEmpresaServer
    var fkGerente = req.body.fkGerenteServer

    console.log(`idEquipe: ${idEquipe} \n
        nome: ${nome} \n
        email: ${email} \n
        token: ${token} \n
        fkGerente: ${fkGerente} \n
        fkEmpresa: ${fkEmpresa} \n`)

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
    } else if (fkGerente == undefined) {
        res.status(403).send("O fkGerente está indefinido!");
    }
    else {
        funcionarioModel.cadastrar(nome, email, idEquipe, token, fkEmpresa, fkGerente)
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


// funcoes nao utilizadas =============================================================
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

function pesquisarmensagem(req, res) {
    var mensagem = req.params.mensagem;

    funcionarioModel.pesquisarmensagem(mensagem)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editar(req, res) {
    var novamensagem = req.body.mensagem;
    var idAviso = req.params.idAviso;

    funcionarioModel.editar(novamensagem, idAviso)
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
    var idAviso = req.params.idAviso;

    funcionarioModel.deletar(idAviso)
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

function curtir(req, res) {
    var idPostagem = req.body.idPostagem;
    var idUsuario = req.body.idUsuario;

    funcionarioModel.curtir(idUsuario, idPostagem)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a curtida: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function descurtir(req, res) {
    var idPostagem = req.body.idPostagem;
    var idUsuario = req.body.idUsuario;

    funcionarioModel.descurtir(idUsuario, idPostagem)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a descurtida: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarPorUsuario,
    pesquisarmensagem,
    editar,
    deletar,
    cadastrar,
    listar,
    curtir,
    descurtir

}