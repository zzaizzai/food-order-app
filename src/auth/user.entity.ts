import { Food } from "src/foods/entities/food.entity";
import { Order } from "src/orders/entities/order.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @OneToMany(type => Food, food => food.user)
    foods: Food[]

    @OneToMany(type => Order, order => order.user)
    orders: Order[]

}