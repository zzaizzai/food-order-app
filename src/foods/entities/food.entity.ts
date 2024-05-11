import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}


export enum FoodStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}