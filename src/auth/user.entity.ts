import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    usernmae: string

    @Column()
    password: string

    
}