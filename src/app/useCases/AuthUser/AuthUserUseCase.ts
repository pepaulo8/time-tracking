import { IUsersRepository } from "../../repositories/IUsersRepository";
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");
import SECRET_KEY from '../../../../env';

interface IRequest {
    email: string;
    password: string;
}

export class AuthUserUseCase {

    constructor(private usersRepository: IUsersRepository){
        
    }

    async execute({ email, password }: IRequest): Promise<void | Error | Object>{

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            return new Error("email is invalid");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return new Error("password is invalid");
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