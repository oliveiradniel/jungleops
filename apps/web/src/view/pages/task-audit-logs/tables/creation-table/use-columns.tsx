import { Link } from '@tanstack/react-router';

import { useMemo } from 'react';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';
import { useTaskAuditLog } from '../../context/use-task-audit-log';

import { cn } from '@/lib/utils';
import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';

import { EllipsisIcon, InfoIcon, Trash2Icon } from 'lucide-react';

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
import { TextCellTooltip } from '../../text-cell-tooltip';
import { StatusBadge } from '@/view/components/ui/status-badge';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { DescriptionHeader } from '../../description-header';
import { TermHeader } from '../../term-header';
import { DateHeader } from '../../date-header';

import type { ColumnDef } from '@tanstack/react-table';
import type {
  ListCreationTaskAuditLogWithAuthorData,
  Task,
} from '@challenge/shared';

export function useColumns(): ColumnDef<ListCreationTaskAuditLogWithAuthorData>[] {
  const { taskDeletionAuditLogsList, isTaskDeletionAuditLogsLoading } =
    useListTaskDeletionAuditLogQuery();

  const { handleOpenDeleteTaskDialog } = useTaskAuditLog();

  const deletedTaskIds = taskDeletionAuditLogsList.map((log) => log.taskId);

  return useMemo<ColumnDef<ListCreationTaskAuditLogWithAuthorData>[]>(
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
        header: ({ column }) => (
          <DateHeader title="Data/horário da criação" column={column} />
        ),
        enableGlobalFilter: false,
        cell: ({ row }) => formatDateToBRWithHour(row.original.changedAt),
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
          const thisTaskDeleted = deletedTaskIds.includes(row.original.taskId);

          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="sm">
                    <EllipsisIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <div>
                    {!thisTaskDeleted && (
                      <Button
                        asChild
                        variant="ghost"
                        className={cn('w-full font-normal')}
                      >
                        <Link
                          to="/tasks/$taskId"
                          params={{ taskId: row.original.taskId }}
                        >
                          <div className="flex items-center gap-2">
                            <InfoIcon className="size-4 text-blue-400" />
                            Ver tarefa
                          </div>
                        </Link>
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      onClick={() =>
                        handleOpenDeleteTaskDialog({
                          selectedLogId: row.original.id,
                          type: 'creation',
                        })
                      }
                      className="flex w-full items-center gap-2 font-normal"
                    >
                      <Trash2Icon className="size-4 text-red-400" />
                      Excluir log
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [isTaskDeletionAuditLogsLoading],
  );
}
