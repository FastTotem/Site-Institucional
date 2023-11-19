process.env.AMBIENTE_PROCESSO = "desenvolvimento";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var empresaRouter = require("./src/routes/empresa");
var usuarioRouter = require("./src/routes/usuario");
var totemRouter = require("./src/routes/totem");
var parametrosRouter = require("./src/routes/parametros");
var parametrosRouter = require("./src/routes/parametros");
var capturaRouter = require("./src/routes/captura");
var relatorioRouter = require("./src/routes/relatorio");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/dadosComponentes", capturaRouterRouter);
app.use("/empresa", empresaRouter);
app.use("/totem", totemRouter);
app.use("/parametros", parametrosRouter);
app.use("/relatorio", relatorioRouter);
app.use("/parametros", parametrosRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
