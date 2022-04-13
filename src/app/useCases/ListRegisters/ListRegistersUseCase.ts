import { inject, injectable } from "tsyringe";
import { Register } from "../../models/entity/Register";
import { IRegistersRepository } from "../../repositories/IRegistersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequestPeriod {
    userId: string;
    startDate: string;
    endDate: string;
}

interface IRequestToday {
    userId: string;
    startDate: string;
}


@injectable()
export class ListRegistersUseCase {

    constructor(
        @inject("RegistersRepository")
        private registersRepository: IRegistersRepository,
        
    ) {}

    async periodTimeSheet ({userId, startDate, endDate}: IRequestPeriod): Promise<Register | Error | object[]>{

        const list = await this.registersRepository.listBetweenDates({userId, startDate, endDate});
        
        const hasRegisters = list.length;

        if(!hasRegisters){
            return new Error("user has no registers");
        }

        const listDatesFormatted = formatDates(list)

        const listPerDay = separatePerDay(listDatesFormatted)
        
        const listDto = addType(listPerDay)
        //console.log("addType", listDto);

        return listDto;
    }
     
}

function separatePerDay(list: Register[]){

    const result = groupBy(list, "date");
    return result
}

function calculateHoursWorked(listDto: Register[]) {
}

function groupBy (array, key) {
	return array.reduce((acc, item) => {
    	if (!acc[item[key]]) acc[item[key]] = []
        acc[item[key]].push(item)
        return acc
    }, {})
}

function formatDates(list: Register[]) {
    list.forEach((el) => {
        const dateStr = el.date.toString()
        const dateArr = dateStr.split(' ')
        
        const dateEN = `${dateArr[2]}/${dateArr[1]}/${dateArr[3]}` // 12/Apr/2022
        el.date = dateEN
    })

    return list
}

function addType(listPerDay: any) {

    const valuesParent = Object.values(listPerDay)

    valuesParent.forEach((el) => {
        let valuesChild = Object.values(el)

        valuesChild.forEach((el,idx) => {
            el.type = idx%2 == 0 ? 'in' : 'out';
            delete el.id
            delete el.userId
        })

    })
    return listPerDay
}