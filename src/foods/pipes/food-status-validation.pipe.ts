import { BadRequestException, PipeTransform } from "@nestjs/common";
import { FoodStatus } from "../entities/food.entity";

export class FoodsStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        FoodStatus.PRIVATE,
        FoodStatus.PUBLIC
    ]

    transform(value: any){
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1
    }

}