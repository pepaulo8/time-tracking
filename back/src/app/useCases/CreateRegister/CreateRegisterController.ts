import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { CreateRegisterUseCase } from './CreateRegisterUseCase'

export class CreateRegisterController {

    async handle(request: Request, response: Response): Promise<Response>{
        const userId = request.userId;

        const createRegisterUseCase = container.resolve(CreateRegisterUseCase);

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