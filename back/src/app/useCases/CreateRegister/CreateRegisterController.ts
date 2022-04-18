import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { AppError } from '../../errors/AppError';
import { CreateRegisterUseCase } from './CreateRegisterUseCase'

export class CreateRegisterController {

    async handle(request: Request, response: Response): Promise<Response>{
        const userId = request.userId;

        const createRegisterUseCase = container.resolve(CreateRegisterUseCase);

        const result = await createRegisterUseCase.execute(userId);

        if(result instanceof AppError){
            return response.status(401).json(result)
        }
        
        return response.status(201).json({
            message: "Registration was successfully completed",
            result
        })
    }
    
}