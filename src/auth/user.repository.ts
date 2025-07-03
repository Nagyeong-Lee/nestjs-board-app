import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CustomRepository } from '../common/typeorm.decorator';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt(); // unique값 생성
    const encodedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: encodedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('user is exist');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
    return user;
  }
}
