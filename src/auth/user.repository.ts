import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CustomRepository } from '../common/typeorm.decorator';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCreateDto: AuthCredentialDto): Promise<User> {
    const { username, password } = authCreateDto;

    const salt = await bcrypt.genSalt(); // unique값 생성
    const encodedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: encodedPassword,
    });

    await this.save(user);
    return user;
  }
}
