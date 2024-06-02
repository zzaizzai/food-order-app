import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Food } from "../../foods/entities/food.entity";
import { User } from "src/auth/user.entity";

@Entity("orders")
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'ORDERED'})
    status: OrderStatus;

    @Column()
    totalPrice: number;

    @Column({default: 1})
    quantity: number;

    @ManyToOne(type => Food, food => food.orders)
    food: Food

    @ManyToOne(type => User, user => user.orders)
    user: User

    @CreateDateColumn()
    createdAt: Date

}

export enum OrderStatus {
    ORDERED = 'ORDERED',
    CANCLED = 'CANCLED',
    DELEVERYING = 'DELEVERYING',
    DELEVERYED = 'DELEVERYED'
}