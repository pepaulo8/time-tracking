import { AppDataSource } from '../../../data-source';
import { Repository }from 'typeorm'
import { Request, Response } from 'express'


import { User } from '../../models/entity/User';
import { IUsersRepository, ICreateUserDTO, IUpdateUserDTO } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository{

    private repository: Repository<User>;

    constructor(){
        this.repository = AppDataSource.getRepository(User);
    }

    index(req:Request, res:Response){
        res.send(req.userId);
    }

    async delete(email:string){
        await this.repository.delete({email});
    }

    async store({name, email, password}: ICreateUserDTO):Promise<void> {

        const user = this.repository.create({name, email, password})
        await this.repository.save(user);
    }

    async findByEmail(email:string): Promise<User | undefined> {

        const userExists = await this.repository.findOne({where: { email }});

        return userExists;
    }

    async findByUserId(userId:string): Promise<User | undefined> {

        const userExists = await this.repository.findOne({where: { id: userId }});

        return userExists;
    }

}