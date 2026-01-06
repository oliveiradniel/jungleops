import { UserTaskEntity } from 'src/database/orm/entities/users-tasks.entity';

import { UserTask } from '@challenge/shared';

export class UserTaskMapper {
  static toDomain(entity: UserTaskEntity): UserTask {
    return {
      id: entity.id,
      taskId: entity.taskId,
      userId: entity.userId,
      createdAt: entity.createdAt,
    };
  }

  static toDomainList(entities: UserTaskEntity[]): UserTask[] {
    return entities.map(UserTaskMapper.toDomain);
  }

  static toEntity(domain: UserTask): UserTaskEntity {
    return {
      id: domain.id,
      taskId: domain.taskId,
      userId: domain.userId,
      createdAt: domain.createdAt,
    };
  }
}
