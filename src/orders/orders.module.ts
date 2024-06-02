import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Food } from 'src/foods/entities/food.entity';
import { User } from 'src/auth/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Food, User])],
    controllers: [OrdersController],
    providers: [OrdersService],
  })
  
export class OrdersModule {}
  