import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
export class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({name, email, password}: IRequest): Promise<void | AppError | object[]>{

        const userExists = await this.usersRepository.findByEmail(email);

        if(userExists){
            return new AppError("email is already associated with another user");
        }
 
        const nameValid = name  
        const emailValid = email 
        const passwordValid = password;

        const validations = [
            {
                field: 'name',
                valid: nameValid,
                message: 'name must be filled'
            },
            {
                field: 'email',
                valid: emailValid,
                message: 'email must be filled'
            },
            {
                field: 'password',
                valid: passwordValid,
                message: 'password must be filled'
            }
        ]
        
        const errors: Object[] = validations.filter( field => !field.valid)

        const existsError = errors.length

        if(existsError){
            return errors
        } else {
            this.usersRepository.store({name, email, password})
        }

    }
}