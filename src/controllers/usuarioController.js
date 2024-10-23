var usuarioModel = require("../models/usuarioModel");
var database = require("../database/config");

const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'equipestaffwatch@gmail.com',
        pass: 'tbmccgwpeugvdwqj',
    }
});

// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var token = req.body.tokenServer;

    usuarioModel.autenticar(email, senha, token)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) { // redirecionar p pagina user.html
                    console.log(resultadoAutenticar, 'AUTENTICAÇÃO REALIZADA!!!!!');

                    res.json({
                        id: resultadoAutenticar[0].idFuncionario,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome,
                        fkEmpresa: resultadoAutenticar[0].fkEmpresa,
                    });

                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeEmp = req.body.nomeEmpServer;
    var cnpj = req.body.cnpjServer;
    var nomeRep = req.body.nomeRepServer;
    var cargo = req.body.cargoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var token = req.body.tokenServer;

    // Faça as validações dos valores
    if (nomeEmp == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (nomeRep == undefined) {
        res.status(400).send("Seu nomeRep está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Sua email está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu senha está undefined!");
    } else {

        token = gerarToken()
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeEmp, cnpj, nomeRep, email, cargo, senha,token)
            .then(
                function (resultado) {
                    res.json(resultado);

                    slack = 'https://join.slack.com/t/sptech-vd51973/shared_invite/zt-2r4gyat4x-xaaEqqxCL4wAW3LqqjSgPw'

                        transport.sendMail({
                            from: '"Staff Watch" <equipestaffwatch@gmail.com>',
                            to: email,
                            subject: "Negociação serviço Staff Watch",
                            html: ` <p>Prezado(a) ${nomeRep},</p>
                            <p>Espero que esta mensagem o(a) encontre bem.</p>

    <p>A <strong>Staff Watch</strong> oferece um software robusto de monitoramento de atividades em tempo real, relatórios personalizados e análises detalhadas de desempenho, permitindo uma gestão mais eficaz de equipes e operações de atendimento ao cliente. Nosso objetivo é contribuir para a melhoria contínua da performance e a tomada de decisões mais estratégicas no seu call center.</p>

    <p>Estamos à disposição para agendar uma demonstração da nossa plataforma e discutir como podemos apoiar as necessidades específicas da sua empresa. Temos certeza de que nossa solução pode agregar valor às suas operações, oferecendo maior controle e eficiência.</p>

    <p>Fico à disposição para agendarmos uma reunião e explorarmos as melhores oportunidades de parceria.</p>

    <p>Aguardo seu retorno e agradeço sua atenção.</p>
    
     <p>Atenciosamente,</p>
    <p><strong>Equipe Staff Watch</strong></p>`
                        })
                            .then((resposta) => console.log("Email enviado"))
                            .catch((resposta) => console.log('erro ao enviar email', resposta))
                         
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function gerarToken() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 6; i++) {
        token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return token
}
// function consultar(req, res) {
//     // Crie uma variável que vá recuperar os valores do arquivo quiz1.html
//     var pontos = req.body.pontosServer;

//     // Faça as validações dos valores
//     if (nome == undefined) {
//         res.status(400).send("Seu nome está undefined!");
//     } else if (nickname == undefined) {
//         res.status(400).send("Seu nickname está undefined!");
//     }else if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está undefined!");
//     } else if (personagem == undefined) {
//         res.status(400).send("Seu personagem está undefined!");
//     } else {

//         // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
//         usuarioModel.cadastrar(nome, nickname, email, senha, personagem)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

module.exports = {
    autenticar,
    cadastrar
    // consultar
}