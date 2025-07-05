import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredentialDto: AuthCredentialDto): Promise<User> {
    return this.authRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto,): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.authRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('login fail');
  }
}
