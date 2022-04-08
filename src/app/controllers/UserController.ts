import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import { Repository }from 'typeorm'


import { User } from '../models/entity/User';

class UserController {
    
    private repository: Repository<User>;

    constructor(){
        this.repository = AppDataSource.getRepository(User);
    }
    

    index(req:Request, res:Response){
        res.send(req.userId);
    }

    async delete(req:Request, res:Response){
        const { email } = req.params 
        const userExists = await this.repository.findOne({ where: { email }});

        if(!userExists){
            return res.sendStatus(409);
        }

        this.repository.delete(email);

        return res.sendStatus(200).json({
            "message": "user successfully deleted"
        });

    }

    async store(req:Request, res:Response) {
        
        const { name, email, password } = req.body;

        const userExists = await this.repository.findOne({ where: { email }});

        if(!userExists){
            return res.sendStatus(409);
        }

        const user = this.repository.create({name, email, password})
        await this.repository.save(user);

        return res.json(user);
    }
}


export default new UserController();