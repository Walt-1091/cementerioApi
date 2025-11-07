import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });

    this.logger.log('JwtStrategy initialized successfully');
  }

  async validate(payload: any) {
    this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);
    
    if (!payload.sub || !payload.username) {
      this.logger.error(`Invalid token payload structure: ${JSON.stringify(payload)}`);
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = { 
      id: payload.sub, 
      username: payload.username 
    };

    this.logger.debug(`User validated successfully: ${user.username}`);
    
    return user;
  }
}