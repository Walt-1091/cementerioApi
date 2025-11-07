import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';


const ssl =
  process.env.DB_SSL === 'false'
    ? false
    : { rejectUnauthorized: false };

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '',
      port: parseInt(process.env.DB_PORT ?? ''),
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
      ssl: ssl,
    }),
    UsersModule,
    AuthModule,
    HealthModule,
  ],
  providers: [AppService],
})
export class AppModule {}