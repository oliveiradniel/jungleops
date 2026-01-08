import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLastEditedByToTasks1763689710536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'last_edited_by',
        type: 'uuid',
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tasks', 'last_edited_by');
  }
}
