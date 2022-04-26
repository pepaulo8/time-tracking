import moment = require("moment");
import { inject, injectable } from "tsyringe";
import { BroadcasterResult } from "typeorm/subscriber/BroadcasterResult";
import { AppError } from "../../errors/AppError";
import { Register } from "../../models/entity/Register";
import { IRegistersRepository } from "../../repositories/IRegistersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateRegisterUseCase {

    constructor(
        @inject("RegistersRepository")
        private registersRepository: IRegistersRepository,
        
        @inject("UsersRepository") 
        private usersRepository: IUsersRepository
    ) {}

    async execute(userId: string): Promise<Register | AppError>{

        
        const user = await this.usersRepository.findByUserId(userId);

        if(!user){
            return new AppError("userId is invalid", 401);
        }

        const today = new Date().toLocaleString("sv-SE"); //format: yyyy-mm-dd , HH:MM:SS
        const todayArr = today.split(' ');

        const date = todayArr[0];
        const time = todayArr[1];

        const register = this.registersRepository.store({userId, date, time});
        return register;
    }
    async getNextRegisterType(userId: string): Promise<string>{

        const today = new Date().toLocaleString("sv-SE"); //format: yyyy-mm-dd , HH:MM:SS
        const todayDate = today.split(' ')[0];

        const startDate = todayDate;
        const endDate = todayDate;

        const registers = await this.registersRepository.listBetweenDates({userId, startDate, endDate});
        const numberRegistersToday = registers.length
        const nextType = numberRegistersToday%2 == 0 ? 'in' : 'out';
        
        return nextType;
    }

    resultToDto (result: Register): Register{
        
        result.date = moment(result.date).format('DD/MM/YYYY')
        
        return result
    }
}