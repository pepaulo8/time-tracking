import { AppDataSource } from '../../../data-source';
import { Repository }from 'typeorm'


import { Register } from '../../models/entity/Register';
import { IRegistersRepository, ICreateRegisterDTO, IUpdateRegisterDTO } from '../IRegistersRepository';


export class RegistersRepository implements IRegistersRepository{

    private repository: Repository<Register>;

    constructor(){
        this.repository = AppDataSource.getRepository(Register);
    }


    async list(userId: string): Promise<Register[]> {

        //const userExists = await this.repository.findOne({where: { id: userId }});
        const registers = await this.repository.find({where: { userId }});

        return registers;
    }

    async store({time, date, userId}: ICreateRegisterDTO):Promise<Register> {

        const register = this.repository.create({time, date, userId})
        await this.repository.save(register);

        return register
    }

    

}