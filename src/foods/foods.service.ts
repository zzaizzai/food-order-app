import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food, FoodStatus } from './entities/food.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodsRepository } from './foods.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class FoodsService {

  constructor(
    @InjectRepository(Food)
    private foodsRepository: FoodsRepository
    ){}

  async createOne(createFoodDto: CreateFoodDto, user: User): Promise<Food> {

    const temp = {
      name: createFoodDto.name,
      status: FoodStatus.PUBLIC,
      user
    }

    const result = await this.foodsRepository.create(temp).save()
    return result 
  }

  async findOwnsAll(
    user: User
  ): Promise<Food[]> {
    const query = this.foodsRepository.createQueryBuilder('foods')

    query.where('foods.userId = :userId', {userId: user.id})
    const foods = await query.getMany();

    return foods
  }

  async deleteFood(id: number, user: User): Promise<void> {
    const reuslt = await this.foodsRepository.delete({id, user})

    if (reuslt.affected === 0) {
      throw new NotFoundException(`Can't find Food with id ${id}`)
    }
  }

  async findAll(): Promise<Food[]> {
    const foods = await this.foodsRepository.find();
    return foods
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
