import { Entity, PrimaryGeneratedColumn, Column , BeforeInsert, BeforeUpdate, OneToMany} from "typeorm"
import bcrypt = require("bcryptjs");
import { Register } from "./Register";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Register, (register) => register.user)
    registers: Register[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(): void{
        this.password = bcrypt.hashSync(this.password, 8)
    }

}
