import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.debug('🔒 === JWT GUARD CANACTIVATE CALLED ===');
    
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    const result = super.canActivate(context);
    
    return result;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {    
    if (err) {
      throw err;
    }
    
    if (!user) {
      
      if (info) {
        if (info.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Token has expired');
        }
        if (info.name === 'JsonWebTokenError') {
          throw new UnauthorizedException('Invalid token');
        }
        if (info.message) {
          throw new UnauthorizedException(info.message);
        }
      }
      
      throw new UnauthorizedException('Invalid or missing token');
    }
    
    return user;
  }
}