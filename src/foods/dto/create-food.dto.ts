import { FoodStatus } from "../entities/food.entity";

export class CreateFoodDto {
    name: string;
    status: FoodStatus
}
