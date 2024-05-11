import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("foods")
export class Food extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    status: FoodStatus;

    @Column({default: null, nullable: true})
    category: string;

    @Column({default: null, nullable: true})
    store: string;

    @ManyToOne(type => User, user => user.foods, {eager: false})
    user: User
}


export enum FoodStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}