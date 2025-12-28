import type { CreateUserData } from '../../modules/users/types/create-user-data.type';

import type { User, UserWithoutPassword } from '@challenge/shared';

export abstract class IUsersRepository {
  abstract getById(id: string): Promise<User | null>;
  abstract getByEmail(email: string): Promise<User | null>;
  abstract getByUsername(username: string): Promise<User | null>;
  abstract getUsers(ids: string[]): Promise<UserWithoutPassword[]>;
  abstract listUsers(): Promise<UserWithoutPassword[]>;
  abstract listUserIds(): Promise<string[]>;
  abstract create(data: CreateUserData): Promise<User>;
}
