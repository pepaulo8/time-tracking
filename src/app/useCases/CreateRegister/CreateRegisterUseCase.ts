import { inject, injectable } from "tsyringe";
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

    async execute(userId: string): Promise<Register | Error | object[]>{

        
        const user = await this.usersRepository.findByUserId(userId);

        if(!user){
            return new Error("userId is invalid");
        }

        const today = new Date().toLocaleString("pt-BR");
        const todayArr = today.split(' ');

        const date = todayArr[0];
        const time = todayArr[1];

        const register = this.registersRepository.store({userId, date, time});
        return register;
    }
}