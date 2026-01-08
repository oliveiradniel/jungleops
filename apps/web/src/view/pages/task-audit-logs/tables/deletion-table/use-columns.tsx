import { useMemo } from 'react';

import { AuthorCell } from '../../components/author-cell';
import { TitleCell } from '../../components/title-cell';
import { AuthorHeader } from '../../components/author-header';
import { TitleHeader } from '../../components/title-header';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { StatusBadge } from '@/view/components/ui/status-badge';
import { TextCellTooltip } from '../../components/text-cell-tooltip';
import { DescriptionHeader } from '../../components/description-header';
import { DateHeader } from '../../components/date-header';
import { TermHeader } from '../../components/term-header';
import { DropdownMenuActions } from '../../components/dropdown-menu-actions';

import type { ColumnDef } from '@tanstack/react-table';
import type { AuditLogOfTaskDeletion } from '@/app/entities/task-audit-log';

export function useColumns(): ColumnDef<AuditLogOfTaskDeletion>[] {
  return useMemo<ColumnDef<AuditLogOfTaskDeletion>[]>(
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
        enableColumnFilter: false,
        header: ({ column }) => (
          <DateHeader title="Data/horário da exclusão" column={column} />
        ),
        cell: ({ row }) => row.original.deletedAt,
        meta: {
          nameInFilters: 'Data/horário',
        },
        sortingFn: 'datetime',
      },
      {
        id: 'Actions',
        enableHiding: false,
        enableColumnFilter: false,
        cell: ({ row }) => (
          <DropdownMenuActions
            logId={row.original.id}
            taskAuditLogType="deletion"
          />
        ),
      },
    ],
    [],
  );
}
