/* import { UsersRepository } from "../../repositories/implementation/UsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import {CreateUserController } from "./CreateUserController";

export default (): CreateUserController => {

    const usersRepository = new UsersRepository();

    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const createUserController = new CreateUserController(createUserUseCase); 

    return createUserController 
} */

