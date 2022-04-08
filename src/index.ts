import { AppDataSource } from "./data-source"
import { Usuario } from "./app/models/entity/Usuario"

AppDataSource.initialize().then(async () => {

    console.log("Conectado ao BD")

}).catch(error => console.log(error))
