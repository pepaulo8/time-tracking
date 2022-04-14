import express = require("express");
import "reflect-metadata";

import './index'
import './app/shared/container'
import router from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, () => console.log("Running on port 3000") );