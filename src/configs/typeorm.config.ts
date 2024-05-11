import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'food_order_app',
    entities: [__dirname + '/../**/*.entity.{js,ts}'] ,
    synchronize: true,
    dropSchema: false

}