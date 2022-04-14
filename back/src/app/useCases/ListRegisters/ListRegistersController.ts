import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { ListRegistersUseCase } from './ListRegistersUseCase'

export class ListRegistersController {

    async handle(request: Request, response: Response): Promise<Response>{
        const userId = request.userId;

        const { startDate, endDate } = request.body

        const listRegistersUseCase = container.resolve(ListRegistersUseCase);

        const resultList = await listRegistersUseCase.periodTimeSheet({userId , startDate, endDate});

        if(resultList instanceof Error){
            return response.status(400).json(resultList.message)
        }

        const resultListFmt = listRegistersUseCase.formatList(resultList)

        const resultDto = listRegistersUseCase.addMinutesWorked(resultListFmt)
        
        return response.status(200).json({
            resultDto
        })
    }
    
}