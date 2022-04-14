import express = require("express");
import "reflect-metadata";

import './index';
import './app/shared/container';
import router from "./routes";
import cors = require("cors");

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    app.use(cors());
    next();
});

app.use(router);

app.listen(3000, () => console.log("Running on port 3000") );