import { TaskEntity } from 'src/database/orm/entities/task.entity';
import { CommentMapper } from 'src/modules/comments/mappers/comment.mapper';

import { Task } from '@challenge/shared';

export class TaskMapper {
  static toDomain(entity: TaskEntity): Task {
    return {
      id: entity.id,
      authorId: entity.authorId,
      lastEditedBy: entity.lastEditedBy,
      title: entity.title,
      description: entity.description,
      term: entity.term,
      priority: entity.priority,
      status: entity.status,
      comments: entity.comments
        ? CommentMapper.toDomainList(entity.comments)
        : [],
      createdAt: entity.createdAt,
    };
  }

  static toDomainWithoutComments(entity: TaskEntity): Omit<Task, 'comments'> {
    return {
      id: entity.id,
      authorId: entity.authorId,
      lastEditedBy: entity.lastEditedBy,
      title: entity.title,
      description: entity.description,
      term: entity.term,
      priority: entity.priority,
      status: entity.status,
      createdAt: entity.createdAt,
    };
  }

  static toDomainList(entities: TaskEntity[]): Task[] {
    return entities.map(TaskMapper.toDomain);
  }

  static toEntity(domain: Task): TaskEntity {
    const entity = new TaskEntity();

    entity.id = domain.id;
    entity.title = domain.title;
    entity.description = domain.description;
    entity.term = domain.term;
    entity.priority = domain.priority;
    entity.status = domain.status;
    entity.createdAt = domain.createdAt;

    return entity;
  }
}
