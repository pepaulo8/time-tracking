import { Register } from './../models/entity/Register';
import { Repository } from 'typeorm'
import { Request, Response } from 'express'
import { User } from '../models/entity/User';


interface ICreateRegisterDTO {
    time: string;
    date: string;
    //user: User;
    userId: string;
}


interface IUpdateRegisterDTO {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
}

interface IRegistersRepository {

    store({time, date, userId}:ICreateRegisterDTO): Promise<Register>;

}

export { IRegistersRepository, ICreateRegisterDTO, IUpdateRegisterDTO}