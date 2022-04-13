import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { ListRegistersUseCase } from './ListRegistersUseCase'

export class ListRegistersController {

    async handle(request: Request, response: Response): Promise<Response>{
        const userId = request.userId;

        const { startDate, endDate } = request.body

        const listRegistersUseCase = container.resolve(ListRegistersUseCase);

        const result = await listRegistersUseCase.periodTimeSheet({userId , startDate, endDate});

        if(result instanceof Error){
            return response.status(400).json(result.message)
        }

        let dates = Object.keys(result)
        let registers = Object.values(result)
        
        let resultDto = []

        registers.forEach((el,idx) => {
            resultDto.push([{
                date: dates[idx],
                registers: registers[idx],
                minutesWorked: el["minutesWorked"]
            }])
        })
        
        return response.status(200).json({
            resultDto
        })
    }
    
}