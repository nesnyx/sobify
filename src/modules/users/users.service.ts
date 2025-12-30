import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  async updateProfile(id: string, name: string) {
    const existing = await this.userRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException('User not found');
    }
    const merged = this.userRepository.merge(existing, { name });
    return await this.userRepository.save(merged)
  }

}