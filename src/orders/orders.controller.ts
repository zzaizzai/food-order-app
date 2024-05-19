import { Controller, Get, Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('orders')
export class OrdersController {
    private logger = new Logger('OrdersController')
    constructor(private readonly ordersService: OrdersService) {}

    
    @Get('/all')
    findAll(@GetUser() user: User){
      this.logger.verbose(`User ${user?.username} trying to get all boards`)
      return this.ordersService.findAll()
    }


}