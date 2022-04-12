import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { DeleteUserUseCase } from './DeleteUserUseCase'

export class DeleteUserController {


    async handle(request: Request, response: Response): Promise<Response>{

        const { email, password } = request.body;

        const deleteUserUseCase = container.resolve(DeleteUserUseCase)
        
        const result = await deleteUserUseCase.execute({ email, password }) 

        if(result instanceof Error){
            return response.status(400).json(result.message)
        } 
        
        return response.status(200).json({
            message: "User successfully deleted"
        })
    }
}