import { Entity, PrimaryGeneratedColumn, Column , BeforeInsert, BeforeUpdate} from "typeorm"
import bcrypt = require("bcryptjs");

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

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 8)
    }

}
