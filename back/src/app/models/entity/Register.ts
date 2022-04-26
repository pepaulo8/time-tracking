import { Entity, Column , JoinColumn, PrimaryColumn, ManyToOne} from "typeorm"
import { User } from "./User"
import { v4 as uuidV4 } from "uuid";

@Entity('registers')
export class Register {

    @PrimaryColumn()
    id: string

    @Column()
    time: string

    @Column()
    date: string

    @ManyToOne(() => User, (user) => user.registers)
    @JoinColumn({ name: "userId" })
    user: User

    @Column()
    userId: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }

}
