import { User } from "src/auth/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order.entity";

export enum FoodStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}


@Entity("foods")
export class Food extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: FoodStatus.PUBLIC})
    status: FoodStatus;

    @Column({default: null, nullable: true})
    category: string;

    @Column({default: null, nullable: true})
    store: string;

    @Column({nullable: true})
    description: string;

    @Column({default: 1})
    price: number;

    @ManyToOne(type => User, user => user.foods)
    user: User

    @OneToMany(type => Order, order => order.food)
    orders: Order[]

    @CreateDateColumn()
    createdAt: Date
}


