import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
    ){}

    async signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
        const user = this.userRepository.create(authcredentialsDto)

        try {
            await user.save()
            
        } catch(error) {
            if (error.code === '23505') {
                throw new ConflictException('Exsting username')
            } else {
                throw new InternalServerErrorException();
            }
        }
        return 
        

    }
}
