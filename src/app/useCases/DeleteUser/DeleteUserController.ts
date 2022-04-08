import { Request, Response } from 'express'
import { DeleteUserUseCase } from './DeleteUserUseCase'

export class DeleteUserController {

    constructor(private deleteUserUseCase: DeleteUserUseCase){

    }

    async handle(request: Request, response: Response): Promise<Response>{

        const { email } = request.body;

        const result = await this.deleteUserUseCase.execute({ email }) 

        if(result instanceof Error){
            return response.status(400).json(result.message)
        } 
        
        return response.status(200).json({
            message: "User successfully deleted"
        })
    }
}