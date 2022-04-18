import { IUsersRepository } from "../../repositories/IUsersRepository";
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");
import SECRET_KEY from '../../../../env';
import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

@injectable()
export class AuthUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
        
    ){}

    async execute({ email, password }: IRequest): Promise<void | Error | Object>{

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            return new AppError("email is invalid", 401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return new AppError("password is invalid", 401);
        } else {
            const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: '1d'});

            delete user.password

            
            return { 
                user: user,
                token: token
             };
        }
        

    }
}