import { UsersRepository } from "../../repositories/implementation/UsersRepository";
import { AuthUserUseCase } from "./AuthUserUseCase";
import { AuthUserController } from './AuthUserController';

export default (): AuthUserController => {

    const usersRepository = new UsersRepository();

    const authUserUseCase = new AuthUserUseCase(usersRepository);

    const authUserController = new AuthUserController(authUserUseCase); 

    return authUserController 
}

