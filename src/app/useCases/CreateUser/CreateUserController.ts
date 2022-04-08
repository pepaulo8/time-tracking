import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {

    constructor(private createUserUseCase: CreateUserUseCase){

    }

    async handle(request: Request, response: Response): Promise<Response>{

        const { name, email, password } = request.body;

        const result = await this.createUserUseCase.execute({name, email, password}) 
        const existsErrorField = typeof result === 'object'

        if(result instanceof Error){
            return response.status(400).json(result.message)
        } else if(existsErrorField){
            return response.status(400).json(result)
        }
        
        return response.status(201).json({
            message: "User registered successfully"
        })
    }
}