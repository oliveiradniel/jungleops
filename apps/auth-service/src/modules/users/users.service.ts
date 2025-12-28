import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { IUsersRepository } from '../../database/contracts/users-repository.contract';

import type { CreateUserData } from './types/create-user-data.type';

import { USERS_REPOSITORY } from 'src/shared/constants/tokens';

import { User, UserWithoutPassword } from '@challenge/shared';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getByEmail(email);
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.getByUsername(username);
  }

  findUsers(ids: string[]): Promise<UserWithoutPassword[]> {
    return this.usersRepository.getUsers(ids);
  }

  listUsers(): Promise<UserWithoutPassword[]> {
    return this.usersRepository.listUsers();
  }

  listUserIds(): Promise<string[]> {
    return this.usersRepository.listUserIds();
  }

  async create(data: CreateUserData): Promise<User> {
    const { email, username, password } = data;

    const user = await this.usersRepository.create({
      email,
      username,
      password,
    });

    return user;
  }
}
