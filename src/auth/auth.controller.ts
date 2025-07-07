import {
  Body,
  Controller,
  Get, Logger,
  Post, Req, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  createUser(@Body() authCredentialDto: AuthCredentialDto): Promise<User> {
    return this.authService.createUser(authCredentialDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Get('token-valid-test')
  @UseGuards(AuthGuard())
  tokenValidTest(@Req() req: Request) {
    this.logger.log(req.user);
  }
}
