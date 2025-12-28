import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { UserMapper } from 'src/modules/users/mappers/user.mapper';

import type { IUsersRepository } from '../../contracts/users-repository.contract';
import type { CreateUserData } from '../../../modules/users/types/create-user-data.type';

import { User, UserWithoutPassword } from '@challenge/shared';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });

    return user ? UserMapper.toDomain(user) : null;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });

    return user ? UserMapper.toDomain(user) : null;
  }

  async getByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username: ILike(username) },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async getUsers(ids: string[]): Promise<UserWithoutPassword[]> {
    const users = await this.userRepository.find({
      where: { id: In(ids) },
    });

    return UserMapper.toDomainListWithoutPassword(users);
  }

  async listUsers(): Promise<UserWithoutPassword[]> {
    const users = await this.userRepository.find();

    return UserMapper.toDomainListWithoutPassword(users);
  }

  async listUserIds(): Promise<string[]> {
    const users = await this.userRepository.find({ select: { id: true } });

    return users.map((user) => user.id);
  }

  async create(data: CreateUserData): Promise<User> {
    const { email, username, password } = data;

    const registeredUser = this.userRepository.create({
      email,
      username,
      password,
    });
    const user = await this.userRepository.save(registeredUser);

    return UserMapper.toDomain(user);
  }
}
