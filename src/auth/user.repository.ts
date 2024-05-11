import { Repository } from "typeorm"
import { User } from "./user.entity"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class UserRepository extends Repository<User> { 
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {
        super(repository.target, repository.manager, repository.queryRunner)
    }
}