import { Body, Controller, Logger, Post, Get, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController')
    constructor(private authService: AuthService) {
    }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void> {
        this.logger.log(`Trying to make a user with name ${authcredentialsDto.username}`)
        try {
            await this.authService.signUp(authcredentialsDto)
            this.logger.log(`User ${authcredentialsDto.username} created`)
        } catch (error) {
            // this.logger.error(`Failed to create user with username: ${authcredentialsDto.username}`, error.stack);
            this.logger.error(`Failed to create user with username: ${authcredentialsDto.username}`);
            throw error; // Rethrow the error to ensure the client receives the error response
        }
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {

        this.logger.log(`Trying Log in user with ${authcredentialsDto.username}`)

        try {
            const accessToken = await this.authService.signIn(authcredentialsDto)
            this.logger.log(`Succeed to log in user with ${authcredentialsDto.username}`)
            return accessToken
        } catch (error) {
            this.logger.error(`Failed to login in user: ${authcredentialsDto.username}`);
            throw error; // Rethrow the error to ensure the client receives the error response
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/check-token')
    checkToken(@GetUser() user: User) {
        this.logger.log(`check token user ${user.username}` )
        // console.log(user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/test-token')
    tokentest(@GetUser() user: User) {
        // console.log('req', user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/test-token')
    tokentesta(@GetUser() user: User) {
        // console.log('req', user)
    }

}
