import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Order } from "../../orders/entities/order.entity";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: false })
    phone: string

    @OneToMany(() => Order, order => order.user)
    orders: Order[]

    @BeforeInsert()
    async hashPassword() {

        this.password = await bcrypt.hash(this.password, 10)

    }

}
