import { IUsersRepository } from "../../repositories/IUsersRepository";
import bcrypt = require("bcryptjs");
import { inject, injectable } from "tsyringe";

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

    async execute({ email, password }: IRequest): Promise<void | Error | object[]>{

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            return new Error("email is invalid");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return new Error("password is invalid");
            //return res.sendStatus(401);
        } else {
            this.usersRepository.delete(email)
        }
        

    }
}