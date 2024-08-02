import { isNotEmpty, IsNotEmpty } from "class-validator";
import { FoodStatus } from "../entities/food.entity";

export class CreateFoodDto {

    @IsNotEmpty()
    name: string;

    store: string;

    category: string;

    price: number;

    status: FoodStatus
}
