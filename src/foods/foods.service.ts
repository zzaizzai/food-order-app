import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food, FoodStatus } from './entities/food.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodsRepository } from './foods.repository';

@Injectable()
export class FoodsService {

  constructor(
    @InjectRepository(Food)
    private foodsRepository: FoodsRepository
    ){}

  async createOne2(createFoodDto: CreateFoodDto): Promise<Food> {

    const temp: CreateFoodDto = {
      name: createFoodDto.name,
      status: FoodStatus.PRIVATE
    }

    const result = await this.foodsRepository.create(temp).save()
    return result 
  }

  findAll() {
    return `This action returns all foods`;
  }

  async findOne(id: number): Promise<Food> {
    console.log("trying")
    const found = await this.foodsRepository.findOneById(id);

    if (!found) {
      throw new NotFoundException(`Cant't find Food with id ${id}`)
    }

    return found
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
