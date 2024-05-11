import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto ): Promise<void> {
        return this.authService.signUp(authcredentialsDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto ): Promise<{accessToken: string}> {

        return this.authService.signIn(authcredentialsDto)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('/test-token')
    tokentest(@GetUser() user: User ) {
        console.log('req', user)
    }

}
