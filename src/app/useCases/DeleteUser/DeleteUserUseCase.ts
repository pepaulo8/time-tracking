import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
}

export class DeleteUserUseCase {

    constructor(private usersRepository: IUsersRepository){
        
    }

    async execute({ email }: IRequest): Promise<void | Error | object[]>{

        const userExists = await this.usersRepository.findByEmail(email);

        if(!userExists){
            return new Error("email is not associated with any user");
        }
        
        this.usersRepository.delete(email)

    }
}