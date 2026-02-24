import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { PasswordService } from 'src/common/security/password.service';
import { use } from 'passport';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly passwordService: PasswordService
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ 
      where: { username } 
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({ 
      where: { id } 
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async updateUser(id: number, password: string): Promise<User> {
  const user = await this.usersRepository.findOne({ where: { id } });
  if (!user) throw new Error('User not found');

  const passwordHash = await this.passwordService.hashPassword(password);

  await this.usersRepository.update(id, {
    password: passwordHash,
    updatedAt: new Date(),
  });

  const updatedUser = await this.findById(id);
  if (!updatedUser) throw new Error('User not found');
  return updatedUser;
}

}