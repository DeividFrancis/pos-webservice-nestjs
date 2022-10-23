import {
  ClassSerializerInterceptor,
  Inject,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly respository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.respository.create(createUserDto);
    await this.respository.save(user);
    return user;
  }

  findAll() {
    return this.respository.find();
  }

  async findOne(id: number) {
    const user = await this.respository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.respository.findOneBy({ email });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.respository.preload({ id, ...updateUserDto });

    if (!user) throw new NotFoundException('User not found');

    await this.respository.save(user);

    return user;
  }

  remove(id: number) {
    return this.respository.delete(id);
  }
}
