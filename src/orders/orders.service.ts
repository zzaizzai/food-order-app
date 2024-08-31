import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { FoodsRepository } from 'src/foods/foods.repository';
import { UserRepository } from 'src/auth/user.repository';
import { Food } from 'src/foods/entities/food.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private ordersRepository: OrdersRepository,
        @InjectRepository(Food)
        private readonly foodRepository: FoodsRepository,
        @InjectRepository(User)
        private readonly userRepository: UserRepository,

    ) { }

    async findOneById(id: number): Promise<Order> {
        return await this.ordersRepository.findOneBy({ id });
    }

    async findAll(): Promise<Order[]> {
        const orders = this.ordersRepository.find({
            relations: ['user', 'food'],
            order: {
                id: 'DESC'
            }
        });
        return orders
    }

    async getSome(id: number, take: number): Promise<Order[]> {

        const orders = await this.ordersRepository.find({
            where: { id: id },
            take: take,
            order: { id: 'ASC' }
        });
        console.log(orders);
        return orders
    }


    async getOne(id: number): Promise<Order> {

        const order = await this.ordersRepository.findOneById(id);
        console.log(order);
        return order
    }

    async addOne(orderData: CreateOrderDto): Promise<Order> {
        const { foodId, userId, quantity, totalPrice, status } = orderData

        const food = await this.foodRepository.findOneById(foodId)

        if (!food) {
            throw new NotFoundException(`Food with ID ${foodId} not found`);
        }

        const user = await this.userRepository.findOneById(userId)
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const order = this.ordersRepository.create({
            food,
            user,
            quantity,
            totalPrice,
            status,
        });
        return await this.ordersRepository.save(order)
    }
}
