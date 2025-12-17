import { TaskAuditLogEntity } from 'src/database/orm/entities/task-audit-logs.entity';

import {
  AuditAction,
  ListCreationTaskAuditLog,
  ListDeletionTaskAuditLog,
  ListUpdateTaskAuditLog,
  TaskAuditLog,
} from '@challenge/shared';

export class TaskAuditLogMapper {
  static toDomain(entity: TaskAuditLogEntity): TaskAuditLog {
    return {
      id: entity.id,
      taskId: entity.taskId,
      authorId: entity.userId,
      taskTitle: entity.taskTitle,
      fieldName: entity.fieldName,
      action: entity.action,
      oldValue: entity.oldValue,
      newValue: entity.newValue,
      changedAt: entity.changedAt,
    };
  }

  static toDomainCreation(
    entity: TaskAuditLogEntity,
  ): ListCreationTaskAuditLog {
    return {
      id: entity.id,
      authorId: entity.userId,
      task: JSON.parse(entity.newValue!),
      createdAt: entity.changedAt,
    };
  }

  static toDomainUpdate(entity: TaskAuditLogEntity): ListUpdateTaskAuditLog {
    return {
      id: entity.id,
      taskId: entity.taskId,
      authorId: entity.userId,
      taskTitle: entity.taskTitle,
      fieldName: entity.fieldName!,
      oldValue: entity.oldValue!,
      newValue: entity.newValue!,
      changedAt: entity.changedAt,
    };
  }

  static toDomainDeletion(
    entity: TaskAuditLogEntity,
  ): ListDeletionTaskAuditLog {
    return {
      id: entity.id,
      authorId: entity.userId,
      task: entity.oldValue!,
      deletedAt: entity.changedAt,
    };
  }

  static toDomainList(entities: TaskAuditLogEntity[]): TaskAuditLog[] {
    return entities.map(this.toDomain);
  }

  static toDomainCreationList(
    entities: TaskAuditLogEntity[],
  ): ListCreationTaskAuditLog[] {
    return entities.map(this.toDomainCreation);
  }

  static toDomainUpdateList(
    entities: TaskAuditLogEntity[],
  ): ListUpdateTaskAuditLog[] {
    return entities.map(this.toDomainUpdate);
  }

  static toDomainDeletionList(
    entities: TaskAuditLogEntity[],
  ): ListDeletionTaskAuditLog[] {
    return entities.map(this.toDomainDeletion);
  }

  static toEntity(domain: TaskAuditLog): TaskAuditLogEntity {
    return {
      id: domain.id,
      taskId: domain.taskId,
      userId: domain.authorId,
      taskTitle: domain.taskTitle,
      fieldName: domain.fieldName,
      action: domain.action as AuditAction,
      oldValue: domain.oldValue,
      newValue: domain.newValue,
      changedAt: domain.changedAt,
    };
  }
}
