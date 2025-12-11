import { Link } from '@tanstack/react-router';

import { useMemo } from 'react';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';
import { useTaskAuditLog } from '../../context/use-task-audit-log';

import { cn } from '@/lib/utils';
import { formatDateToBRWithHour } from '@/app/utils/format-date-br';

import { EllipsisIcon, InfoIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu';
import { AuthorCell } from '../../author-cell';
import { TaskDetailsPopover } from '../../task-details-popover';
import { TitleCell } from '../../title-cell';
import { AuthorHeader } from '../../author-header';

import type { ColumnDef } from '@tanstack/react-table';
import type { ListCreationTaskAuditLogWithAuthorData } from '@challenge/shared';

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
        header: 'Título',
        cell: ({ row }) => <TitleCell row={row} />,
        meta: {
          nameInFilters: 'Título',
        },
      },
      {
        accessorKey: 'values',
        header: 'Valores na criação',
        enableGlobalFilter: false,
        cell: ({ row }) => {
          const values = JSON.parse(row.original.values);
          const thisTaskDeleted = deletedTaskIds.includes(row.original.taskId);

          return (
            <TaskDetailsPopover
              values={values}
              isTaskDeletionAuditLogsLoading={isTaskDeletionAuditLogsLoading}
            >
              <Button
                disabled={isTaskDeletionAuditLogsLoading || thisTaskDeleted}
                variant={thisTaskDeleted ? 'destructive' : 'default'}
                className="mt-4 w-full"
              >
                <Link to="/tasks/$taskId" params={{ taskId: values.id }}>
                  {thisTaskDeleted ? 'Indisponível' : 'Ver informações'}
                </Link>
              </Button>
            </TaskDetailsPopover>
          );
        },
        meta: {
          nameInFilters: 'Valores',
        },
      },
      {
        accessorKey: 'changedAt',
        header: 'Data/horário da criação',
        enableGlobalFilter: false,
        cell: ({ row }) => formatDateToBRWithHour(row.original.changedAt),
        meta: {
          nameInFilters: 'Data/horário',
        },
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
