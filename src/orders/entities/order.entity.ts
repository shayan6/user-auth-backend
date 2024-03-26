import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    text: string

    @ManyToOne(() => User, user => user.orders, { onDelete: 'SET NULL', cascade: true })
    user: User

}
