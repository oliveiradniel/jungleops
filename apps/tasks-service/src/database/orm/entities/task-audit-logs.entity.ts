import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AuditAction, FieldName } from '@challenge/shared';

@Entity('task_audit_logs')
export class TaskAuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'task_id' })
  taskId: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'enum', enum: AuditAction, name: 'action' })
  action: AuditAction;

  @Column({ type: 'text', name: 'task_title' })
  taskTitle: string;

  @Column({ type: 'enum', enum: FieldName, name: 'field_name', nullable: true })
  fieldName: FieldName | null;

  @Column({ type: 'text', name: 'old_value', nullable: true })
  oldValue: string | null;

  @Column({ type: 'text', name: 'new_value', nullable: true })
  newValue: string | null;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'changed_at' })
  changedAt: Date;
}
