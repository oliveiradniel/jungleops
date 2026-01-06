import { useMemo } from 'react';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';

import { AuthorCell } from '../../components/author-cell';
import { TaskUpdateValueCell } from '../../components/task-update-value-cell';
import { TitleCell } from '../../components/title-cell';
import { AuthorHeader } from '../../components/author-header';
import { TitleHeader } from '../../components/title-header';
import { DateHeader } from '../../components/date-header';
import { DropdownMenuActions } from '../../components/dropdown-menu-actions';

import type { ColumnDef } from '@tanstack/react-table';
import type { AuditLogOfTaskUpdate } from '@/app/entities/task-audit-log';

export function useColumns(): ColumnDef<AuditLogOfTaskUpdate>[] {
  const { taskDeletionAuditLogsList } = useListTaskDeletionAuditLogQuery();

  const deletedTaskIds = taskDeletionAuditLogsList.map((log) => log.task.id);

  return useMemo<ColumnDef<AuditLogOfTaskUpdate>[]>(
    () => [
      {
        id: 'author',
        accessorFn: (row) => `${row.author.username} ${row.author.email}`,
        header: ({ column }) => <AuthorHeader column={column} />,
        cell: ({ row }) => <AuthorCell row={row} />,
        meta: {
          nameInFilters: 'Autor',
        },
      },
      {
        id: 'title',
        accessorFn: (row) => row.task.title,
        header: ({ column }) => <TitleHeader column={column} />,
        cell: ({ row }) => <TitleCell row={row} />,
        meta: {
          nameInFilters: 'Título',
        },
      },
      {
        accessorKey: 'fieldName',
        header: 'Campo',
        cell: ({ row }) => row.original.fieldName.label,
        meta: {
          nameInFilters: 'Campo',
        },
      },
      {
        accessorKey: 'oldValue',
        header: 'Valor antigo',
        cell: ({ row }) => (
          <TaskUpdateValueCell
            value={row.original.oldValue}
            fieldName={row.original.fieldName}
          />
        ),
        meta: {
          nameInFilters: 'Valor antigo',
        },
      },
      {
        accessorKey: 'newValue',
        header: 'Valor atual',
        cell: ({ row }) => (
          <TaskUpdateValueCell
            value={row.original.newValue}
            fieldName={row.original.fieldName}
          />
        ),
        meta: {
          nameInFilters: 'Valor atual',
        },
      },
      {
        accessorKey: 'changedAt',
        enableGlobalFilter: false,
        header: ({ column }) => (
          <DateHeader title="Data/horário da atualização" column={column} />
        ),
        cell: ({ row }) => row.original.changedAt,
        meta: {
          nameInFilters: 'Data/horário',
        },
        sortingFn: 'datetime',
      },
      {
        id: 'Actions',
        enableHiding: false,
        enableGlobalFilter: false,
        cell: ({ row }) => {
          const thisTaskDeleted = deletedTaskIds.includes(row.original.task.id);

          const { id, task } = row.original;

          return (
            <DropdownMenuActions
              logId={id}
              taskId={task.id}
              thisTaskDeleted={thisTaskDeleted}
              taskAuditLogType="update"
            />
          );
        },
      },
    ],
    [deletedTaskIds],
  );
}
