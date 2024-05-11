import { Food, FoodStatus } from "src/foods/entities/food.entity";
import { DataSource, } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class FoodsSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');

        const repository = dataSource.getRepository(Food);
        await repository.insert({
            name: 'Mazedul',
            status: FoodStatus.PRIVATE,
        });
    }
}