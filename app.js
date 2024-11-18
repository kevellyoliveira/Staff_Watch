// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

// app.get('/maquinas/listarEquipe', async (req, res) => {
//     try {
//         // Simulação de chamada ao banco de dados
//         const listaDeEquipes = await db.query("SELECT * FROM equipes"); // Substitua pela sua query
//         if (listaDeEquipes.length === 0) {
//             return res.status(204).send(); // Sem conteúdo
//         }
//         res.status(200).json(listaDeEquipes);
//     } catch (error) {
//         console.error("Erro ao listar equipes:", error);
//         res.status(500).send("Erro interno do servidor");
//     }
// });



var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var funcionariosRouter = require("./src/routes/funcionarios");
var enderecoRouter = require("./src/routes/enderecos");
var medidasRouter = require("./src/routes/medidas");
var maquinasRouter = require("./src/routes/maquinas");
var dispositivosRouter = require("./src/routes/dispositivos");
// var empresasRouter = require("./src/routes/empresas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/funcionarios", funcionariosRouter);
app.use("/enderecos", enderecoRouter);
app.use("/medidas", medidasRouter);
app.use("/maquinas", maquinasRouter);
app.use("/dispositivos", dispositivosRouter);
// app.use("/empresas", empresasRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
