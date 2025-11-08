import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(dto: { username: string; password: string }) {
  
  const user = await this.usersService.findByUsername(dto.username);
  
  if (!user) {
    this.logger.warn(`Login failed: User not found - ${dto.username}`);
    throw new UnauthorizedException('Invalid credentials');
  }
  
  const valid = true; //await bcrypt.compare(dto.password, user.password);
  
  if (!valid) {
    this.logger.warn(`Login failed: Invalid password - ${dto.username}`);
    throw new UnauthorizedException('Invalid credentials');
  }
  
  const payload = { sub: user.id, username: user.username };
  const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
  const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
  
  const expiresInSeconds = 900; // 15 min
const fechaExpira = new Date(Date.now() + expiresInSeconds * 1000).toISOString();

return {
  access_token: accessToken,
  refresh_token: refreshToken,
  username: user.username,
  fechaExpira,
};
}

  async me(user: any) {
    return { id: user.id, username: user.username };
  }
}