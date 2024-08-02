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
    ) { }

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

        query.where('foods.userId = :userId', { userId: user.id })
        const foods = await query.getMany();

        return foods
    }

    async deleteFood(id: number, user: User): Promise<void> {
        const reuslt = await this.foodsRepository.delete({ id, user })

        if (reuslt.affected === 0) {
            throw new NotFoundException(`Can't find Food with id ${id}`)
        }
    }

    async findAll(): Promise<Food[]> {
        const foods = await this.foodsRepository.find();
        return foods
    }

    async findOne(id: number): Promise<Food> {
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


    async addOne(createDto: CreateFoodDto) {
        const food = this.foodsRepository.create(createDto);
        return await this.foodsRepository.save(food)

    }

    async getSome(take: number, lastId: number): Promise<Food[]> {

        const queryBuilder = this.foodsRepository.createQueryBuilder('foods')

        if (lastId && lastId > 0) {
            queryBuilder.where('foods.id < :lastId', { lastId });
        }

        // 공통된 부분은 조건문 밖으로 빼서 한 번만 실행
        const orders = await queryBuilder
            .orderBy('foods.id', 'DESC')
            .take(take)
            .getMany();

        return orders;
    }


    // async getSome(id: number, take: number): Promise<Food[]> {

    //   const queryBuilder = await this.foodsRepository.createQueryBuilder('foods')
    //   const orders = await queryBuilder
    //     .where('foods.id < :id', { id })
    //     .orderBy('foods.id', "DESC")
    //     .take(take)
    //     .getMany()

    //   return orders
    // }


}
