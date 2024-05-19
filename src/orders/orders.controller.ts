import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

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

    ) {
        console.log(id)
        console.log(take)
        this.logger.verbose(`User ${user?.username} trying to get all orders`)
        return this.ordersService.getSome(+id, +take)
    }


}
