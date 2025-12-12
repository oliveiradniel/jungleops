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
import { AuthorCell } from '../../author-cell';
import { TitleCell } from '../../title-cell';
import { AuthorHeader } from '../../author-header';
import { TitleHeader } from '../../title-header';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { StatusBadge } from '@/view/components/ui/status-badge';
import { TextCellTooltip } from '../../text-cell-tooltip';

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
        header: 'Descrição',
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
        id: 'prioridade',
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
        header: 'Prazo',
        cell: ({ row }) => {
          const values = JSON.parse(row.original.values) as Task;

          return formatDateToBR(values.term);
        },
        meta: {
          nameInFilters: 'Prazo',
        },
      },
      {
        accessorKey: 'changedAt',
        enableColumnFilter: false,
        header: 'Data/horário da exclusão',
        cell: ({ row }) => formatDateToBRWithHour(row.original.changedAt),
        meta: {
          nameInFilters: 'Data/horário',
        },
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
