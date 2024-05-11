import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'

const dbConfig = config.get('db')
export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: 'localhost',
    port: dbConfig.port,
    username: 'admin',
    password: 'admin',
    database: dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'] ,
    synchronize: dbConfig.synchronize,
    dropSchema: false

}