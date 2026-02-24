import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from 'src/common/strategies/jwt-access.strategy';
import { SecurityModule } from 'src/common/security/security.module';
import { PasswordEmailService } from './password-email.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: { expiresIn: '30m' },
      }),
      inject: [ConfigService],
    }),
    SecurityModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PasswordEmailService],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}