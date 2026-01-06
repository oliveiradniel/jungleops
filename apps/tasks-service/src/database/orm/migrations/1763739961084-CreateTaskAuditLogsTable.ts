import { AuditAction, FieldName } from '@challenge/shared';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTaskAuditLogsTable1763739961084
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task_audit_logs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'task_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'field_name',
            type: 'enum',
            enum: Object.values(FieldName),
            isNullable: true,
          },
          {
            name: 'action',
            type: 'enum',
            enum: Object.values(AuditAction),
            isNullable: false,
          },
          {
            name: 'task_title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'old_value',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'new_value',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'changed_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        indices: [
          { name: 'IDX_TASK_AUDIT_LOGS_TASK_ID', columnNames: ['task_id'] },
          { name: 'IDX_TASK_AUDIT_LOGS_USER_ID', columnNames: ['user_id'] },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_audit_logs');
  }
}
