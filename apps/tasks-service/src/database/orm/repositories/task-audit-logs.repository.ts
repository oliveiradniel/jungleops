import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { TaskAuditLogEntity } from '../entities/task-audit-logs.entity';
import { TaskAuditLogMapper } from 'src/modules/task-audit-logs/mappers/task-audit-log.mapper';

import { ITaskAuditLogsRepository } from 'src/database/contracts/task-audit-logs.contract';

import type { CreateTaskAuditLogData } from 'src/modules/task-audit-logs/types/create-task-audit-log-data.type';

import {
  AuditAction,
  TaskAuditLog,
  ListCreationTaskAuditLog,
  ListUpdateTaskAuditLog,
  ListDeletionTaskAuditLog,
} from '@challenge/shared';

export class TaskAuditLogsRepository implements ITaskAuditLogsRepository {
  constructor(
    @InjectRepository(TaskAuditLogEntity)
    private readonly taskAuditLogsRepository: Repository<TaskAuditLogEntity>,
  ) {}

  async create(data: CreateTaskAuditLogData): Promise<TaskAuditLog> {
    const { action, taskId, userId, taskTitle, oldValue, newValue, fieldName } =
      data;

    const audit = this.taskAuditLogsRepository.create({
      action,
      taskId,
      userId,
      taskTitle,
      oldValue: oldValue ?? null,
      newValue: newValue ?? null,
      fieldName: fieldName ?? null,
    } as DeepPartial<TaskAuditLogEntity>);

    return TaskAuditLogMapper.toDomain(
      await this.taskAuditLogsRepository.save(audit),
    );
  }

  async list(): Promise<TaskAuditLog[]> {
    const listTaskAuditLogs = await this.taskAuditLogsRepository.find();

    return TaskAuditLogMapper.toDomainList(listTaskAuditLogs);
  }

  async listTaskUpdateAuditLog(): Promise<ListUpdateTaskAuditLog[]> {
    const list = await this.taskAuditLogsRepository
      .createQueryBuilder('log')
      .where('log.action = :action', { action: 'UPDATE' })
      .orderBy('ABS(EXTRACT(EPOCH FROM (NOW() - log.changedAt)))', 'ASC')
      .getMany();

    return TaskAuditLogMapper.toDomainUpdateList(list);
  }

  async listTaskDeletionAuditLog(): Promise<ListDeletionTaskAuditLog[]> {
    const list = await this.taskAuditLogsRepository
      .createQueryBuilder('log')
      .where('log.action = :action', { action: 'DELETE' })
      .select([
        'log.id',
        'log.taskId',
        'log.userId',
        'log.taskTitle',
        'log.oldValue',
        'log.newValue',
        'log.changedAt',
      ])
      .orderBy('ABS(EXTRACT(EPOCH FROM (NOW() - log.changedAt)))', 'ASC')
      .getMany();

    return TaskAuditLogMapper.toDomainDeletionList(list);
  }

  async listTaskCreationAuditLog(): Promise<ListCreationTaskAuditLog[]> {
    const list = await this.taskAuditLogsRepository
      .createQueryBuilder('log')
      .where('log.action = :action', { action: 'CREATE' })
      .select([
        'log.id',
        'log.taskId',
        'log.userId',
        'log.taskTitle',
        'log.newValue',
        'log.changedAt',
      ])
      .orderBy('ABS(EXTRACT(EPOCH FROM (NOW() - log.changedAt)))', 'ASC')
      .getMany();

    return TaskAuditLogMapper.toDomainCreationList(list);
  }

  // async list(filters: TaskAuditLogsFilters): Promise<TaskAuditLogEntity[]> {
  //   const { task, userId, fieldName } = filters;

  //   const where: Partial<TaskAuditLogsFilters> = {};

  //   if (task) where.task = { id: task.id };
  //   if (userId) where.userId = userId;
  //   if (fieldName) where.fieldName = fieldName;

  //   const listTaskAuditLogs = await this.taskAuditLogsRepository.find({
  //     where,
  //   });

  //   return listTaskAuditLogs;
  // }
}
