import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signIn(authcredentialsDto: AuthCredentialsDto):Promise<{accessToken: string}> {
        const {username, password} = authcredentialsDto;
        const user = await this.userRepository.findOneBy({username})
        console.log(user)
        if (user &&(await bcrypt.compare(password, user.password))) {
            
            // User Token
            const payload = {username};
            const accessToken = await this.jwtService.sign(payload)
            
            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed')
        }
    }

    async signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authcredentialsDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({username, password: hashedPassword})
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
