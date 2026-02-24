import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 12;

  async hashPassword(plain: string): Promise<string> {
    if (!plain || plain.trim().length < 8) {
      throw new Error('Password must be at least 8 characters.');
    }
    return bcrypt.hash(plain, this.saltRounds);
  }

  async verifyPassword(plain: string, hash: string): Promise<boolean> {
    if (!plain || !hash) return false;
    return bcrypt.compare(plain, hash);
  }
}