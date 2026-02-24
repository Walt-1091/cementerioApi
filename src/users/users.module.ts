import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity/user.entity';
import { UserController } from './users.controller';
import { SecurityModule } from 'src/common/security/security.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SecurityModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
