//adicionando atributo a interface request 

declare namespace Express {
    export interface Request {
        userId: string;
    }
}