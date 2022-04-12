import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { ListRegistersUseCase } from './ListRegistersUseCase'

export class ListRegistersController {

    async handle(request: Request, response: Response): Promise<Response>{
        const userId = request.userId;

        const listRegistersUseCase = container.resolve(ListRegistersUseCase);

        const result = await listRegistersUseCase.execute(userId);

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }
        
        return response.status(200).json({
            result
        })
    }
    
}