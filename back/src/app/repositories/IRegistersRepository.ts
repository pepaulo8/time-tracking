import { Register } from './../models/entity/Register';

interface ICreateRegisterDTO {
    time: string;
    date: string;
    userId: string;
}


interface IListRegistersBetweenDatesDTO {
    userId: string;
    startDate: string;
    endDate: string;
}

interface IRegistersRepository {

    listBetweenDates({userId, startDate, endDate}: IListRegistersBetweenDatesDTO): Promise<Register[]>

    list(userId: string): Promise<Register[]>;

    store({time, date, userId}:ICreateRegisterDTO): Promise<Register>;

}

export { IRegistersRepository, ICreateRegisterDTO, IListRegistersBetweenDatesDTO}