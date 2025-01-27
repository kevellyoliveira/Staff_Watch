var funcionarioModel = require("../models/funcionarioModel");

function cadastrar(req, res) {

    let nome = req.body.nomeServer
    let email = req.body.emailServer
    let telefone = req.body.telefoneServer
    let idEquipe = req.body.idEquipeServer
    // let token = req.body.tokenServer
    var fkEmpresa = req.body.fkEmpresaServer;

    console.log(`idEquipe: ${idEquipe} \n
            nome: ${nome} \n
            email: ${email} \n
            telefone: ${telefone} \n
            fkEmpresa: ${fkEmpresa}
            `)

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("O email está indefinido!");
    } else if (telefone == undefined) {
        res.status(400).send("O telefone está indefinido!");
    } else if (idEquipe == undefined) {
        res.status(403).send("O idEquipe está indefinido!");
    } else if (fkEmpresa == undefined) {
        res.status(403).send("O fkEmpresa está indefinido!");
    }
    else {
        funcionarioModel.cadastrar(nome, email, telefone, idEquipe, fkEmpresa)
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

function cadastrarGerenteTI(req, res){

    let nome = req.body.nomeServer
    let email = req.body.emailServer
    let telefone = req.body.telefoneServer
    let idEquipe = req.body.idEquipeServer
    // let token = req.body.tokenServer
    var fkEmpresa = req.body.fkEmpresaServer;

    console.log(`idEquipe: ${idEquipe} \n
            nome: ${nome} \n
            email: ${email} \n
            telefone: ${telefone} \n
            fkEmpresa: ${fkEmpresa}
            `)

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("O email está indefinido!");
    } else if (telefone == undefined) {
        res.status(400).send("O telefone está indefinido!");
    } else if (idEquipe == undefined) {
        res.status(403).send("O idEquipe está indefinido!");
    } else if (fkEmpresa == undefined) {
        res.status(403).send("O fkEmpresa está indefinido!");
    }
    else {
        funcionarioModel.cadastrar(nome, email, telefone, idEquipe, fkEmpresa)
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

function cadastrarGerenteOp(req, res){

    let nome = req.body.nomeServer
    let email = req.body.emailServer
    let telefone = req.body.telefoneServer
    let idEquipe = req.body.idEquipeServer
    // let token = req.body.tokenServer
    var fkEmpresa = req.body.fkEmpresaServer;

    console.log(`idEquipe: ${idEquipe} \n
            nome: ${nome} \n
            email: ${email} \n
            telefone: ${telefone} \n
            fkEmpresa: ${fkEmpresa}
            `)

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("O email está indefinido!");
    } else if (telefone == undefined) {
        res.status(400).send("O telefone está indefinido!");
    } else if (idEquipe == undefined) {
        res.status(403).send("O idEquipe está indefinido!");
    } else if (fkEmpresa == undefined) {
        res.status(403).send("O fkEmpresa está indefinido!");
    }
    else {
        funcionarioModel.cadastrar(nome, email, telefone, idEquipe, fkEmpresa)
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
    const fkEmpresa = req.params.fkEmpresa; // Extrai o ID da empresa dos parâmetros da URL
    funcionarioModel.listar(fkEmpresa).then(function (resultado) {
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

function listarEquipe(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    const fkEquipe = req.params.fkEquipe;

    // Extrai o ID da empresa dos parâmetros da URL
    funcionarioModel.listar(fkEmpresa, fkEquipe).then(function (resultado) {
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

function listarEquipes(req, res) {
    const fkEmpresa = req.params.fkEmpresa

    funcionarioModel.listarEquipes(fkEmpresa).then(function (resultado) {
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


function listarPorUsuario(req, res) {
    const fkEmpresa = req.params.fkEmpresa;
    var nomeFuncionario = req.params.inputPesquisa;

    funcionarioModel.listarPorUsuario(fkEmpresa, nomeFuncionario)
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

    funcionarioModel.editar(idEquipe, nome, email, idFuncionario)
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

function abrirModal(req, res) {

    var idFuncionario = req.params.idFuncionario;

    funcionarioModel.abrirModal(idFuncionario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar o funcionário: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function puxarDadosChamada(req, res) {
    const idFunc = req.params.idFunc;

    funcionarioModel.puxarDadosChamada(idFunc)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function puxarTempoChamada(req, res) {
    const idFunc = req.params.idFunc;

    funcionarioModel.puxarTempoChamada(idFunc)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function puxarTotalChamada(req, res) {
    const idFunc = req.params.idFunc;

    funcionarioModel.puxarTotalChamada(idFunc)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function puxarTotalPerdida(req, res) {
    const idFunc = req.params.idFunc;

    funcionarioModel.puxarTotalPerdida(idFunc)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}

function puxarTotalAtendida(req, res) {
    const idFunc = req.params.idFunc;

    funcionarioModel.puxarTotalAtendida(idFunc)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function eficienciaChamada(req, res) {
    const idFunc = req.params.idFunc;

    funcionarioModel.eficienciaChamada(idFunc)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function carregarGrafico(req, res) {
    const { endpoint, fkFuncionario } = req.params;
    let dados;

    try {
        if (endpoint === "tempoChamada") {
            dados = funcionarioModel.puxarTempoChamada(fkFuncionario);
        } else if (endpoint === "tempoEspera") {
            dados = funcionarioModel.puxarDadosChamada(fkFuncionario);
        } else if (endpoint === "eficiencia") {
            dados = funcionarioModel.eficienciaEquipeChamada(fkFuncionario);
        } else if (endpoint === "totalPerdida") {
            dados = funcionarioModel.puxarTotalPerdida(fkFuncionario);
        } else {
            return res.status(400).json({ erro: "Endpoint inválido." });
        }
        return res.json(dados); // Retorna os dados encontrados
    } catch (err) {
        console.error("Erro ao buscar dados:", err);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
}




// Equipe

function puxarDadosEquipeChamada(req, res) {
    const fkEquipe = req.params.fkEquipe;

    funcionarioModel.puxarDadosEquipeChamada(fkEquipe)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function puxarTempoEquipeChamada(req, res) {
    const fkEquipe = req.params.fkEquipe;

    funcionarioModel.puxarTempoEquipeChamada(fkEquipe)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function puxarTotalEquipeChamada(req, res) {

    const fkEquipe = req.params.fkEquipe;

    funcionarioModel.puxarTotalEquipeChamada(fkEquipe)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function puxarTotalEquipePerdida(req, res) {
    const fkEquipe = req.params.fkEquipe;

    funcionarioModel.puxarTotalEquipePerdida(fkEquipe)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}

function puxarTotalEquipeAtendida(req, res) {

    const fkEquipe = req.params.fkEquipe;

    funcionarioModel.puxarTotalEquipeAtendida(fkEquipe)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function eficienciaEquipeChamada(req, res) {

    const fkEquipe = req.params.fkEquipe;

    funcionarioModel.eficienciaEquipeChamada(fkEquipe)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

                                            // Empresa

function puxarDadosEmpresaChamada(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.puxarDadosEmpresaChamada(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function puxarTempoEmpresaChamada(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.puxarTempoEmpresaChamada(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function puxarTotalEmpresaChamada(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.puxarTotalEmpresaChamada(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function puxarTotalEmpresaPerdida(req, res) {
    
    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.puxarTotalEmpresaPerdida(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}

function puxarTotalEmpresaAtendida(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.puxarTotalEmpresaAtendida(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function eficienciaEmpresaChamada(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.eficienciaEmpresaChamada(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function plotarGrafico(req, res) {

    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.plotarGrafico(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao listar os dados da chamada: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function filtrarTempoChamadaMedia(req, res) {
    const dataSelecionada = req.params.dataSelecionada;
    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.filtrarTempoChamadaMedia(dataSelecionada, fkEmpresa)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao listar dados da chamada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function filtrarTempoEficiencia(req, res) {
    const dataSelecionada = req.params.dataSelecionada;
    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.filtrarTempoEficiencia(dataSelecionada, fkEmpresa)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao listar dados da chamada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function filtrarTempoMedioEspera(req, res) {
    const dataSelecionada = req.params.dataSelecionada;
    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.filtrarTempoMedioEspera(dataSelecionada, fkEmpresa)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao listar dados da chamada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function filtrarTempoChamadaPerdida(req, res) {
    const dataSelecionada = req.params.dataSelecionada;
    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.filtrarTempoChamadaPerdida(dataSelecionada, fkEmpresa)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao listar dados da chamada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function filtrarTempoGrafico(req, res) {

    const dataSelecionada = req.params.dataSelecionada;
    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.filtrarTempoGrafico(dataSelecionada, fkEmpresa)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado)
        })
        .catch((erro) => {
            console.error("Erro ao listar dados da chamada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// Filtro funcionário

function filtrarTempoChamada(req, res) {
    const dataSelecionada = req.params.dataSelecionada;  // Correção: usar params para pegar dados da URL
    const idFunc = req.params.idFunc;  // Correção: idFunc está na URL

    console.log("Data selecionada:", dataSelecionada);
    console.log("ID do Funcionário:", idFunc);

    funcionarioModel.filtrarTempoChamada(dataSelecionada, idFunc)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao listar dados da chamada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function filtrarTempoEspera(req, res) {
    const dataSelecionada = req.params.dataSelecionada;  // Correção: usar params para pegar dados da URL
    const idFunc = req.params.idFunc;  // Correção: idFunc está na URL

    console.log("Data selecionada:", dataSelecionada);
    console.log("ID do Funcionário:", idFunc);

    funcionarioModel.filtrarTempoEspera(dataSelecionada, idFunc)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao listar dados da chamada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function filtrarEficiencia(req, res) {
    const dataSelecionada = req.params.dataSelecionada;  // Correção: usar params para pegar dados da URL
    const idFunc = req.params.idFunc;  // Correção: idFunc está na URL

    console.log("Data selecionada:", dataSelecionada);
    console.log("ID do Funcionário:", idFunc);

    funcionarioModel.filtrarEficiencia(dataSelecionada, idFunc)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao listar dados da chamada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function filtrarPerdida(req, res){

    const dataSelecionada = req.params.dataSelecionada;  // Correção: usar params para pegar dados da URL
    const idFunc = req.params.idFunc;  // Correção: idFunc está na URL

    console.log("Data selecionada:", dataSelecionada);
    console.log("ID do Funcionário:", idFunc);

    funcionarioModel.filtrarPerdida(dataSelecionada, idFunc)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado);
        })
        .catch((erro) => {
            console.error("Erro ao listar dados da chamada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}




function plotarGraficoFiltrado(req, res) {
    
    const dataSelecionada = req.params.dataSelecionada;
    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.plotarGraficoFiltrado(dataSelecionada, fkEmpresa)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado)
        })
        .catch((erro) => {
            console.error("Erro ao listar dados da chamada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });

}

function pegarDadosAlerta(){
    const fkEquipe = req.params.fkEquipe;
    const fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.pegarDadosAlerta(fkEquipe, fkEmpresa)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado)
        })
        .catch((erro) => {
            console.error("Erro ao listar dados das equipes: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });

}

function contarEquipes(req, res){
   
    const fkEmpresa = req.params.fkEmpresa;
    
    funcionarioModel.contarEquipes(fkEmpresa)
        .then((resultado) => {
            res.json(resultado);
            console.log(resultado)
        })
        .catch((erro) => {
            console.error("Erro ao listar dados das equipes: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarPorUsuario,
    editar,
    deletar,
    cadastrar,
    listar,
    listarEquipe,
    listarEquipes,
    abrirModal,
    puxarDadosChamada,
    puxarTempoChamada,
    puxarTotalChamada,
    puxarTotalPerdida,
    puxarTotalAtendida,
    eficienciaChamada,
    puxarDadosEquipeChamada,
    puxarTempoEquipeChamada,
    puxarTotalEquipeChamada,
    puxarTotalEquipePerdida,
    puxarTotalEquipeAtendida,
    puxarDadosEmpresaChamada,
    puxarTempoEmpresaChamada,
    puxarTotalEmpresaChamada,
    puxarTotalEmpresaPerdida,
    puxarTotalEmpresaAtendida,
    eficienciaEmpresaChamada,
    eficienciaEquipeChamada,
    carregarGrafico,
    plotarGrafico,
    filtrarTempoChamadaMedia,
    filtrarTempoEficiencia,
    filtrarTempoMedioEspera,
    filtrarTempoChamadaPerdida,
    filtrarTempoGrafico,
    plotarGraficoFiltrado,
    cadastrarGerenteTI,
    cadastrarGerenteOp,
    pegarDadosAlerta,
    contarEquipes,
    filtrarTempoChamada,
    filtrarTempoEspera,
    filtrarEficiencia,
    filtrarPerdida
}

