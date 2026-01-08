import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';

import { TaskPriority, TaskStatus } from '@challenge/shared';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @Column({ type: 'uuid', name: 'author_id' })
  authorId: string;

  @Column({ type: 'uuid', name: 'last_edited_by' })
  lastEditedBy: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'date' })
  term: string;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    nullable: true,
    default: TaskPriority.LOW,
  })
  priority: TaskPriority;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    nullable: true,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => CommentEntity, (comment) => comment.task, {
    cascade: true,
  })
  comments: CommentEntity[];
}
