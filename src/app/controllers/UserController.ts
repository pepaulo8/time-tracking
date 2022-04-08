import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';

import { User } from '../models/entity/User';

class UserController {
    async store(req:Request, res:Response) {
        const repository = AppDataSource.getRepository(User)
        const { name, email, password } = req.body;

        const userExists = await repository.findOne({ where: { email }});

        if(userExists){
            res.sendStatus(409);
        }

        const user = repository.create({name, email, password})
        await repository.save(user);

        return res.json(user);
    }
}


export default new UserController();