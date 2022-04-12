import { Repository } from 'typeorm'
import { Request, Response } from 'express'
import { User } from '../models/entity/User';


interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
}


interface IUpdateUserDTO {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
}

interface IUsersRepository {

    index(req:Request, res:Response): void;

    delete(email:string): void;

    store({name, email, password}:ICreateUserDTO): Promise<void>;

    findByEmail(email:string): Promise<User | undefined>;
    
    findByUserId(userId:string): Promise<User | undefined>;

}

export { IUsersRepository, ICreateUserDTO, IUpdateUserDTO}