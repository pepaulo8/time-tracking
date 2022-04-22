import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { AppError } from '../../errors/AppError';
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {


    async handle(request: Request, response: Response): Promise<Response> {

        const { name, email, password } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase)

        if (createUserUseCase.validateEmail(email)) {
            const result = await createUserUseCase.execute({ name, email, password })
            const existsErrorField = typeof result === 'object'

            if (result instanceof AppError) {
                return response.status(400).json(result)
            } else if (existsErrorField) {
                return response.status(400).json(result)
            }

            return response.status(201).json({
                message: "User registered successfully"
            })
        } else {
            return response.status(400).json({
                message: "E-mail format provided is invalid"
            })
        }

    }
}