import { useMemo } from 'react';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';

import { AuthorCell } from '../../components/author-cell';
import { TitleCell } from '../../components/title-cell';
import { AuthorHeader } from '../../components/author-header';
import { TitleHeader } from '../../components/title-header';
import { TextCellTooltip } from '../../components/text-cell-tooltip';
import { StatusBadge } from '@/view/components/ui/status-badge';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { DescriptionHeader } from '../../components/description-header';
import { TermHeader } from '../../components/term-header';
import { DateHeader } from '../../components/date-header';
import { DropdownMenuActions } from '../../components/dropdown-menu-actions';

import type { ColumnDef } from '@tanstack/react-table';
import type { AuditLogOfTaskCreation } from '@/app/entities/task-audit-log';

export function useColumns(): ColumnDef<AuditLogOfTaskCreation>[] {
  const { taskDeletionAuditLogsList } = useListTaskDeletionAuditLogQuery();

  const deletedTaskIds = taskDeletionAuditLogsList.map((log) => log.task.id);

  return useMemo<ColumnDef<AuditLogOfTaskCreation>[]>(
    () => [
      {
        id: 'author',
        accessorFn: (row) => row.author.username,
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
        id: 'description',
        accessorFn: (row) => row.task.description,
        header: ({ column }) => <DescriptionHeader column={column} />,
        cell: ({ row }) => (
          <TextCellTooltip text={row.original.task.description} />
        ),
        meta: {
          nameInFilters: 'Descrição',
        },
      },
      {
        id: 'status',
        accessorFn: (row) => row.task.status.value,
        header: 'Status',
        cell: ({ row }) => {
          const { value, label } = row.original.task.status;

          return <StatusBadge value={value} label={label} />;
        },
        meta: {
          nameInFilters: 'Status',
        },
      },
      {
        id: 'priority',
        accessorFn: (row) => row.task.priority.value,
        header: 'Prioridade',
        cell: ({ row }) => {
          const { value, label } = row.original.task.priority;

          return <PriorityBadge value={value} label={label} />;
        },
        meta: {
          nameInFilters: 'Prioridade',
        },
      },
      {
        id: 'term',
        accessorFn: (row) => row.task.term,
        header: ({ column }) => <TermHeader column={column} />,
        cell: ({ row }) => row.original.task.term,
        meta: {
          nameInFilters: 'Prazo',
        },
        sortingFn: 'datetime',
      },
      {
        accessorKey: 'changedAt',
        header: ({ column }) => (
          <DateHeader title="Data/horário da criação" column={column} />
        ),
        enableGlobalFilter: false,
        cell: ({ row }) => row.original.createdAt,
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
              taskAuditLogType="creation"
            />
          );
        },
      },
    ],
    [deletedTaskIds],
  );
}
