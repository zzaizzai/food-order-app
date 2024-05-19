import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OrdersRepository extends Repository<Order> {
    constructor(
        @InjectRepository(Order)
        private repository: Repository<Order>
    ) {
        super(repository.target, repository.manager, repository.queryRunner)
    }

    async findOneById(id: number): Promise<Order> {
        return await this.repository.findOneBy({id});
    }
}