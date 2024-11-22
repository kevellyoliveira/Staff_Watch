var redeMatheusModel = require("../models/redeMatheusModel");

function buscarPacotes(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    console.log(`fkEmpresa recebido na controller:", fkEmpresa`);

    redeMatheusModel.buscarPacotes(fkEmpresa).then(function (resultado) {
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

function numerosBuscarRede(req, res) {
    var fkComponente = req.params.fkComponente;
    console.log("fkComponente recebido na controller:", fkComponente);

    redeMatheusModel.numerosBuscarRede(fkComponente)
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

function maquinasBuscarRede(req, res) {
    var fkComponente = req.params.fkComponente;
    console.log("fkComponente recebido na controller:", fkComponente);

    redeMatheusModel.maquinasBuscarRede(fkComponente)
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
    buscarPacotes,
    numerosBuscarRede,
    maquinasBuscarRede
}