import { IsNotEmpty } from "class-validator";
import { OrderStatus } from "../entities/order.entity";

export class CreateOrderDto {

    @IsNotEmpty()
    foodId: number;

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    totalPrice: number;
    
    status: OrderStatus = OrderStatus.ORDERED

}