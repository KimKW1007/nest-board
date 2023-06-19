import { Controller, Post, Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto : AuthCredentialsDto): Promise<void>{
    return this.authService.signUp(authCredentialsDto)
  }

  @Post("signin")
  singIn(@Body(ValidationPipe) authCredentialsDto : AuthCredentialsDto): Promise<{accessToken : string}>{
    return this.authService.signIn(authCredentialsDto)
  }
}
