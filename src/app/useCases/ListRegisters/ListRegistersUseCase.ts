import { inject, injectable } from "tsyringe";
import { Register } from "../../models/entity/Register";
import { IRegistersRepository } from "../../repositories/IRegistersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class ListRegistersUseCase {

    constructor(
        @inject("RegistersRepository")
        private registersRepository: IRegistersRepository,
        
        @inject("UsersRepository") 
        private usersRepository: IUsersRepository
    ) {}

    async execute(userId: string): Promise<Register | Error | object[]>{

        const list = await this.registersRepository.list(userId);
        
        const hasRegisters = list.length;

        if(!hasRegisters){
            return new Error("user has no registers");
        }

        return list;
    }
}