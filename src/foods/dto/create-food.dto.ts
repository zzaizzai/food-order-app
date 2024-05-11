import { IsNotEmpty } from "class-validator";
import { FoodStatus } from "../entities/food.entity";

export class CreateFoodDto {

    @IsNotEmpty()
    name: string;

    status: FoodStatus
}
