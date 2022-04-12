import { Request, Response } from 'express'
import { RegistersRepository } from '../../repositories/implementation/RegistersRepository';
import { UsersRepository } from '../../repositories/implementation/UsersRepository';
import { CreateRegisterUseCase } from './CreateRegisterUseCase'

export class CreateRegisterController {

    constructor(private createRegisterUseCase: CreateRegisterUseCase){
    }

    async handle(request: Request, response: Response): Promise<Response>{
        const userId = request.userId;

        const registersRepository = new RegistersRepository();
        const usersRepository = new UsersRepository();

        const createRegisterUseCase = new CreateRegisterUseCase(registersRepository, usersRepository);

        //const result = await this.createRegisterUseCase.execute(userId);
        const result = await createRegisterUseCase.execute(userId);

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }
        
        return response.status(201).json({
            message: "Registration was successfully completed",
            result
        })
    }
    
}