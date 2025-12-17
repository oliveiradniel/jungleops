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

  async getById(id: string): Promise<TaskAuditLog | null> {
    const taskAuditLog = await this.taskAuditLogsRepository.findOne({
      where: { id },
    });

    return taskAuditLog ? TaskAuditLogMapper.toDomain(taskAuditLog) : null;
  }

  async list(): Promise<TaskAuditLog[]> {
    const listTaskAuditLogs = await this.taskAuditLogsRepository.find();

    return TaskAuditLogMapper.toDomainList(listTaskAuditLogs);
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
        'log.changedAt',
      ])
      .orderBy('ABS(EXTRACT(EPOCH FROM (NOW() - log.changedAt)))', 'ASC')
      .getMany();

    return TaskAuditLogMapper.toDomainDeletionList(list);
  }

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

  async delete(id: string): Promise<void> {
    await this.taskAuditLogsRepository.delete(id);
  }
}
