import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private authRepository: UserRepository) {}

  async createUser(authCredentialDto: AuthCredentialDto): Promise<User> {
    return this.authRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.authRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    }
    throw new UnauthorizedException('login fail');
  }
}
