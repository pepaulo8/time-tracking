import { IUsersRepository } from "../../repositories/IUsersRepository";
import bcrypt = require("bcryptjs");
import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

@injectable()
export class DeleteUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
        
    ){}

    async execute({ email, password }: IRequest): Promise<void | AppError | object[]>{

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            return new AppError("email is invalid");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return new AppError("password is invalid");
        } else {
            this.usersRepository.delete(email)
        }
        

    }
}