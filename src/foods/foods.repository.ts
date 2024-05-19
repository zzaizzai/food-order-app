import { Repository } from "typeorm";
import { CreateFoodDto } from "./dto/create-food.dto";
import { Food, FoodStatus } from "./entities/food.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FoodsRepository extends Repository<Food> {
    constructor(
        @InjectRepository(Food)
        private repository: Repository<Food>
    ) {
        super(repository.target, repository.manager, repository.queryRunner)
    }

    async findOneById(id: number): Promise<Food> {
        return await this.repository.findOneBy({id});
    }
    
}