import { AppDataSource } from "./data-source"
import { User } from "./app/models/entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Conectado ao BD")

}).catch(error => console.log(error))
