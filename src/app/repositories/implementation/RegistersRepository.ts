import { AppDataSource } from '../../../data-source';
import { Repository }from 'typeorm'


import { Register } from '../../models/entity/Register';
import { IRegistersRepository, ICreateRegisterDTO, IUpdateRegisterDTO } from '../IRegistersRepository';


export class RegistersRepository implements IRegistersRepository{

    private repository: Repository<Register>;

    constructor(){
        this.repository = AppDataSource.getRepository(Register);
    }

    async store({time, date, userId}: ICreateRegisterDTO):Promise<Register> {

        const register = this.repository.create({time, date, userId})
        await this.repository.save(register);

        return register
    }

}