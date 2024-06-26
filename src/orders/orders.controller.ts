import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
    private logger = new Logger('OrdersController')
    constructor(private readonly ordersService: OrdersService) { }


    @Get('/all')
    findAll(@GetUser() user: User) {
        this.logger.verbose(`User ${user?.username} trying to get all orders`)
        return this.ordersService.findAll()
    }

    @Get('/getSome')
    getSome(@GetUser() user: User,
        @Query('id') id: string,
        @Query('take') take: string
    ): Promise<Order[]> {
        this.logger.verbose(`User ${user?.username} trying to get some orders id:${id}, take: ${take}`)
        return this.ordersService.getSome(+id, +take)
    }

    @Post('/addOne')
    async addOne(
        @GetUser() user: User, 
        @Body() createOrderDto: CreateOrderDto
    ): Promise<Order> {
        console.log(createOrderDto)
        this.logger.verbose(`User ${user?.username} Order id:${createOrderDto.foodId}, user:${createOrderDto.userId}, trying to be created`)
        return await this.ordersService.addOne(createOrderDto)
    }
}
