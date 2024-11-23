var redeRuanModel = require("../models/redeRuanModel");

function puxarPacotesPerdidos(req, res) {
    // const idFuncionario = req.params.idFuncionario;

    redeRuanModel.puxarPacotesPerdidos()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao puxar pacotes perdidos ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}


module.exports = {
    puxarPacotesPerdidos
}