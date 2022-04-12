import { inject, injectable } from "tsyringe";
import { Register } from "../../models/entity/Register";
import { IRegistersRepository } from "../../repositories/IRegistersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    userId: string;
    startDate: string;
    endDate: string;
}


@injectable()
export class ListRegistersUseCase {

    constructor(
        @inject("RegistersRepository")
        private registersRepository: IRegistersRepository,
        
    ) {}

    async execute({userId, startDate, endDate}: IRequest): Promise<Register | Error | object[]>{

        const list = await this.registersRepository.listBetweenDates({userId, startDate, endDate});
        
        const hasRegisters = list.length;

        if(!hasRegisters){
            return new Error("user has no registers");
        }

        const listDto:any = [];

        list.forEach((el,idx) => {

            const dateStr = el.date.toString()
            const dateArr = dateStr.split(' ')
            
            const dateEN = `${dateArr[2]}/${dateArr[1]}/${dateArr[3]}` // 12/Apr/2022

            let objDto = {
                date: dateEN,
                time: el.time,
                type: ''
            };

            if(idx % 2 == 0 ){
                objDto.type = 'in'
            } else {
                objDto.type ='out'
            }
            listDto.push(objDto)
        })

        return listDto;
    }
}