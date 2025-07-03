import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(private authRepository: UserRepository) {}

  async createUser(authCreateDto: AuthCredentialDto): Promise<User> {
    return this.authRepository.createUser(authCreateDto);
  }
}
