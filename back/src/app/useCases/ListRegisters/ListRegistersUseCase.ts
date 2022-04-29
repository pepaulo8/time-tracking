import { inject, injectable } from "tsyringe";
import { Register } from "../../models/entity/Register";
import { IRegistersRepository } from "../../repositories/IRegistersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import moment = require("moment");
import { AppError } from "../../errors/AppError";

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


    addMinutesWorked(resultDto: object[]): object[] {
        var periodMinutesWorked = 0
        const limitHoursDay = 8
        
        resultDto.forEach((el) => {
            var elZero = el[0]
            periodMinutesWorked = elZero.minutesWorked + periodMinutesWorked
        })
        
        const periodOverworked = periodMinutesWorked > 60 * limitHoursDay 
         
        const hours = Math.floor((periodMinutesWorked/60))
        const minutes = periodMinutesWorked % 60

        const periodHoursWorked =  `${hours}:${minutes < 10 ? '0' + minutes : minutes}`

        resultDto.push({ periodHoursWorked , periodOverworked })
        return resultDto
    }

    formatList(result: object[]): object[] {
        let dates = Object.keys(result)
        let registers = Object.values(result)
        
        let resultDto = []

        registers.forEach((el,idx) => {
            let qtdRegisters = Object.keys(el).length - 2;
            resultDto.push([{
                date: dates[idx],
                registers: registers[idx],
                minutesWorked: el["minutesWorked"],
                overworked: el["overworked"],
                missingRegistration: qtdRegisters % 2 != 0 
            }])
        })
        return resultDto
    }

    async periodTimeSheet ({userId, startDate, endDate}: IRequestPeriod): Promise<AppError | object[]>{

        const list = await this.registersRepository.listBetweenDates({userId, startDate, endDate});
        
        const hasRegisters = list.length;

        if(!hasRegisters){
            return new AppError("User has no registrations");
        }

        const listDatesFormatted = formatDates(list)

        const listPerDay = separatePerDay(listDatesFormatted)
        const listDto = addType(listPerDay)

        return listDto;
    }
     
}

function separatePerDay(list: Register[]){

    const result = groupBy(list, "date");
    return result
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
        const dateBR = moment(dateStr, 'ddd MMM DD YYYY').format('DD/MM/YYYY') // 26/04/2022
        el.date = dateBR
    })

    return list
}

function addType(listPerDay: any):object[] {
    const limitHoursDay = 8
    const valuesGrand = Object.values(listPerDay)

    valuesGrand.forEach((el) => {
        let valuesParent = Object.values(el)
        el["minutesWorked"] = 0

        for (let index = 0; index < valuesParent.length; index++) {
            const element = valuesParent[index];
            let valuesChild = Object.values(element)

            if(index%2 != 0){
                const elementBef = valuesParent[index-1]
                
                var momTimeBef = moment(elementBef.time, 'HH:mm:ss')
                var momTimeCur = moment(element.time, 'HH:mm:ss')
 
                const diffMinutes = momTimeCur.diff(momTimeBef,'m')

                el["minutesWorked"] = diffMinutes +  el["minutesWorked"]
            }

            element.type = index%2 == 0 ? 'in' : 'out';
            delete element.id
            delete element.userId
        }
        el["overworked"] = el["minutesWorked"] > 60 * limitHoursDay;  
    })
    return listPerDay
}

