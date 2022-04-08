import { UsersRepository } from "../../repositories/implementation/UsersRepository";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { DeleteUserController } from './DeleteUserController';

export default (): DeleteUserController => {

    const usersRepository = new UsersRepository();

    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

    const deleteUserController = new DeleteUserController(deleteUserUseCase); 

    return deleteUserController 
}

