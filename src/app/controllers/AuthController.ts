import { Request, Response } from 'express'
import { AppDataSource } from '../../data-source';
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");

import SECRET_KEY from '../../../env';

import { User } from '../models/entity/User';

class AuthController {
    async authenticate(req:Request, res:Response) {
        const repository = AppDataSource.getRepository(User)
        const { name, email, password } = req.body;

        const user = await repository.findOne({ where: { email }});

        if(!user){
            return res.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.sendStatus(401);
        }
        
        const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: '1d'});

        delete user.password

        return res.json({
            user,
            token
        });
    }
}


export default new AuthController();