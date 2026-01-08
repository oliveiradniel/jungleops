import { UserEntity } from 'src/database/orm/entities/user.entity';

import { User, UserWithoutPassword } from '@challenge/shared';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return {
      id: entity.id,
      email: entity.email,
      username: entity.username,
      password: entity.password,
      createdAt: entity.createdAt,
    };
  }

  static toDomainList(entities: UserEntity[]): User[] {
    return entities.map((entity) => UserMapper.toDomain(entity));
  }

  static toDomainWithoutPassword(entity: UserEntity): UserWithoutPassword {
    return {
      id: entity.id,
      email: entity.email,
      username: entity.username,
      createdAt: entity.createdAt,
    };
  }

  static toDomainListWithoutPassword(
    entities: UserEntity[],
  ): UserWithoutPassword[] {
    return entities.map((entity) => UserMapper.toDomainWithoutPassword(entity));
  }

  static toEntity(domain: User): UserEntity {
    return {
      id: domain.id,
      email: domain.email,
      username: domain.username,
      password: domain.password,
      createdAt: domain.createdAt,
    };
  }
}
