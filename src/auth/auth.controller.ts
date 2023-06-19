import { Controller, Post, Body, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@Req() req){
    console.log({req})
  }

}
