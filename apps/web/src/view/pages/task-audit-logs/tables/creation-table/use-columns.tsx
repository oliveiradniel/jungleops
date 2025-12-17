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

import type { ColumnDef } from '@tanstack/react-table';
import type { AuditLogOfTaskCreation } from '@/app/entities/task-audit-log';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu';
import { Button } from '@/view/components/ui/button';
import { EllipsisIcon, InfoIcon, Trash2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { useTaskAuditLog } from '../../context/use-task-audit-log';

export function useColumns(): ColumnDef<AuditLogOfTaskCreation>[] {
  const { handleOpenDeleteTaskAuditLogDialog } = useTaskAuditLog();

  const { taskDeletionAuditLogsList, isTaskDeletionAuditLogsLoading } =
    useListTaskDeletionAuditLogQuery();

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
                          params={{ taskId: row.original.task.id }}
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
                      onClick={() => {
                        handleOpenDeleteTaskAuditLogDialog({
                          selectedLogId: row.original.id,
                          type: 'creation',
                        });
                      }}
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
