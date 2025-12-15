import { Link } from '@tanstack/react-router';

import { useMemo } from 'react';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';
import { useTaskAuditLog } from '../../context/use-task-audit-log';

import { cn } from '@/lib/utils';
import { formatDateToBRWithHour } from '@/app/utils/format-date-br';
import { fieldLabels } from '@/config/labels';

import { EllipsisIcon, InfoIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu';
import { AuthorCell } from '../../components/author-cell';
import { TaskUpdateValueCell } from '../../components/task-update-value-cell';
import { TitleCell } from '../../components/title-cell';
import { AuthorHeader } from '../../components/author-header';
import { TitleHeader } from '../../components/title-header';
import { DateHeader } from '../../components/date-header';

import type { ColumnDef } from '@tanstack/react-table';
import type {
  FieldName,
  ListUpdateTaskAuditLogWithAuthorData,
} from '@challenge/shared';

export function useColumns(): ColumnDef<ListUpdateTaskAuditLogWithAuthorData>[] {
  const { taskDeletionAuditLogsList } = useListTaskDeletionAuditLogQuery();

  const { handleOpenDeleteTaskDialog } = useTaskAuditLog();

  const deletedTaskIds = taskDeletionAuditLogsList.map((log) => log.taskId);

  return useMemo<ColumnDef<ListUpdateTaskAuditLogWithAuthorData>[]>(
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
        accessorKey: 'fieldName',
        header: 'Campo',
        cell: ({ row }) => fieldLabels[row.original.fieldName as FieldName],
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
                  <Button aria-label="Ver opções" variant="ghost" size="sm">
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
                          type: 'update',
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
    [],
  );
}
