/* import { UsersRepository } from './../../repositories/implementation/UsersRepository';
import { RegistersRepository } from "../../repositories/implementation/RegistersRepository";
import { CreateRegisterUseCase } from "./CreateRegisterUseCase";
import { CreateRegisterController } from "./CreateRegisterController";

export default (): CreateRegisterController => {

    const registersRepository = new RegistersRepository();
    const usersRepository = new UsersRepository();

    const createRegisterUseCase = new CreateRegisterUseCase(registersRepository, usersRepository);

    const createRegisterController = new CreateRegisterController(createRegisterUseCase); 

    return createRegisterController 
} */

