import { Request, Response } from 'express'
import { AuthUserUseCase } from './AuthUserUseCase'

export class AuthUserController {

    constructor(private authUserUseCase: AuthUserUseCase){

    }

    async handle(request: Request, response: Response): Promise<Response>{

        const { email, password } = request.body;

        const result = await this.authUserUseCase.execute({ email, password }) 

        if(result instanceof Error){
            return response.status(401).json(result.message)
        }
        
        return response.status(200).json(result)
    }

    index(req:Request, res:Response){
        res.status(200).json({
            userId: req.userId
        });
    }
}