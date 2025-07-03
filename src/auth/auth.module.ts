import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeormModule } from '../common/typeorm.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeormModule.forCustomRepository([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
