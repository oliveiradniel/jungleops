import { useMemo } from 'react';
import { useTaskAuditLog } from '../../context/use-task-audit-log';

import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';

import { EllipsisIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu';
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

import type { ColumnDef } from '@tanstack/react-table';
import type {
  ListDeletionTaskAuditLogWithAuthorData,
  Task,
} from '@challenge/shared';

export function useColumns(): ColumnDef<ListDeletionTaskAuditLogWithAuthorData>[] {
  const { handleOpenDeleteTaskDialog } = useTaskAuditLog();

  return useMemo<ColumnDef<ListDeletionTaskAuditLogWithAuthorData>[]>(
    () => [
      {
        id: 'author',
        accessorFn: (row) =>
          `${row.authorData.username} ${row.authorData.email}`,
        header: ({ column }) => <AuthorHeader column={column} />,
        cell: ({ row }) => <AuthorCell row={row} />,
        meta: {
          nameInFilters: 'Autor',
        },
      },
      {
        accessorKey: 'taskTitle',
        header: ({ column }) => <TitleHeader column={column} />,
        cell: ({ row }) => <TitleCell row={row} />,
        meta: {
          nameInFilters: 'Título',
        },
      },
      {
        id: 'description',
        accessorFn: (row) => (JSON.parse(row.values) as Task).description,
        header: ({ column }) => <DescriptionHeader column={column} />,
        cell: ({ row }) => {
          const values = JSON.parse(row.original.values) as Task;

          return <TextCellTooltip text={values.description} />;
        },
        meta: {
          nameInFilters: 'Descrição',
        },
      },
      {
        id: 'status',
        accessorFn: (row) => (JSON.parse(row.values) as Task).status,
        header: 'Status',
        cell: ({ row }) => {
          const values = JSON.parse(row.original.values) as Task;

          return <StatusBadge status={values.status} />;
        },
        meta: {
          nameInFilters: 'Status',
        },
      },
      {
        id: 'priority',
        accessorFn: (row) => (JSON.parse(row.values) as Task).priority,
        header: 'Prioridade',
        cell: ({ row }) => {
          const values = JSON.parse(row.original.values) as Task;

          return <PriorityBadge priority={values.priority} />;
        },
        meta: {
          nameInFilters: 'Prioridade',
        },
      },
      {
        id: 'term',
        accessorFn: (row) => (JSON.parse(row.values) as Task).term,
        header: ({ column }) => <TermHeader column={column} />,
        cell: ({ row }) => {
          const values = JSON.parse(row.original.values) as Task;

          return formatDateToBR(values.term);
        },
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
        cell: ({ row }) => formatDateToBRWithHour(row.original.changedAt),
        meta: {
          nameInFilters: 'Data/horário',
        },
        sortingFn: 'datetime',
      },
      {
        id: 'Actions',
        enableHiding: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="sm">
                    <EllipsisIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      handleOpenDeleteTaskDialog({
                        selectedLogId: row.original.id,
                        type: 'deletion',
                      })
                    }
                    className="flex w-full items-center gap-2 font-normal"
                  >
                    <Trash2Icon className="size-4 text-red-400" />
                    Excluir log
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [],
  );
}
