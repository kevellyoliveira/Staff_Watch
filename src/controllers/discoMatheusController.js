var discoMatheusModel = require("../models/discoMatheusModel");

function buscarDisco(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    console.log(`fkEmpresa recebido na controller:", fkEmpresa`);

    discoMatheusModel.buscarDisco(fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function numerosBuscarDisco(req, res) {
    var fkComponente = req.params.fkComponente;
    console.log("fkComponente recebido na controller:", fkComponente);

    discoMatheusModel.numerosBuscarDisco(fkComponente)
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

function maquinasBuscarDisco(req, res) {
    var fkComponente = req.params.fkComponente;
    console.log("fkComponente recebido na controller:", fkComponente);

    discoMatheusModel.maquinasBuscarDisco(fkComponente)
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
    buscarDisco,
    numerosBuscarDisco,
    maquinasBuscarDisco
}