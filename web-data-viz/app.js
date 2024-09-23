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

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var perfilRouter = require("./src/routes/perfil");
var postRouter = require("./src/routes/post");
var jogoRouter = require("./src/routes/jogo");
var graficosRouter = require("./src/routes/graficos");
// var graficoRouter = require("./src/routes/grafico");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/perfil", perfilRouter);
app.use("/post", postRouter);
app.use("/jogo", jogoRouter);
app.use("/graficos", graficosRouter);
// app.use("/grafico", graficoRouter);

app.listen(PORTA_APP, function () {
    console.log(`!!! Servidor iniciado !!!`);
});
