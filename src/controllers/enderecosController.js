var enderecosModel = require("../models/enderecosModel");

function listarEnderecos(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    console.log("fkEmpresa recebido na controller:", fkEmpresa);

    enderecosModel.listarEnderecos(fkEmpresa)
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

module.exports = {
    listarEnderecos
}