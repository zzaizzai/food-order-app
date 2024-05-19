import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private ordersRepository: OrdersRepository

    ) { }

    async findOneById(id: number): Promise<Order> {
        return await this.ordersRepository.findOneBy({ id });
    }

    async findAll(): Promise<Order[]> {
        const orders = this.ordersRepository.find({ relations: ['user', 'food'] });
        return orders
    }

}
