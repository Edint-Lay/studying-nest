import { Controller, Post, Body, ValidationPipe, UseGuards, Headers, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { customGetUserDecorator } from 'src/decorator/get.user.decorator';

import { AuthService } from './auth.service';
import { PostUserDto, LoginUserDto } from 'src/models/dtos/_.loader';
import { Users } from '../models/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body(ValidationPipe) body: PostUserDto) {
    await this.authService.signup(body);
  }

  @Post('/login')
  async login(@Body(ValidationPipe) body: LoginUserDto): Promise<{ token : string }> {
    return await this.authService.login(body);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  async authTest(@customGetUserDecorator() user : Users) {
    console.log(user)
  }
}
