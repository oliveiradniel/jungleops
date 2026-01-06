import { CommentEntity } from 'src/database/orm/entities/comment.entity';
import { TaskEntity } from 'src/database/orm/entities/task.entity';

import { TaskComment } from '@challenge/shared';

export class CommentMapper {
  static toDomain(entity: CommentEntity): TaskComment {
    return {
      id: entity.id,
      taskId: entity.task?.id,
      userId: entity.userId,
      comment: entity.comment,
      createdAt: entity.createdAt,
    };
  }

  static toDomainList(entities: CommentEntity[]): TaskComment[] {
    return entities.map(CommentMapper.toDomain);
  }

  static toEntity(domain: TaskComment, task: TaskEntity): CommentEntity {
    const entity = new CommentEntity();

    entity.id = domain.id;
    entity.userId = domain.userId;
    entity.comment = domain.comment;
    entity.createdAt = domain.createdAt;
    entity.task = task;

    return entity;
  }
}
