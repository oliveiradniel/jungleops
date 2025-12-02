import { Link } from '@tanstack/react-router';

import { useMemo } from 'react';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';

import { cn } from '@/lib/utils';
import { truncateString } from '@/app/utils/truncate-string';
import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';
import { fieldLabels, priorityLabels, statusLabels } from '@/config/labels';
import { EllipsisIcon, InfoIcon, XIcon } from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/view/components/ui/popover';

import type { ColumnDef } from '@tanstack/react-table';
import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';
import type {
  FieldName,
  ListUpdateTaskAuditLogWithAuthorData,
} from '@challenge/shared';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu';

export function useColumns(): ColumnDef<ListUpdateTaskAuditLogWithAuthorData>[] {
  const { taskDeletionAuditLogsList } = useListTaskDeletionAuditLogQuery();

  const deletedTaskIds = taskDeletionAuditLogsList.map((log) => log.taskId);

  return useMemo<ColumnDef<ListUpdateTaskAuditLogWithAuthorData>[]>(
    () => [
      {
        accessorKey: 'authorData',
        header: 'Autor',
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span>{row.original.authorData.username}</span>
            <span className="text-muted-foreground text-xs">
              {row.original.authorData.email}
            </span>
          </div>
        ),
        meta: {
          nameInFilters: 'Autor',
        },
      },
      {
        accessorKey: 'taskTitle',
        header: 'Título',
        cell: ({ row }) => truncateString(row.original.taskTitle, 40),
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
        cell: ({ row }) => {
          const oldValue = row.original.oldValue;

          const isFieldNamePriority = row.original.fieldName === 'priority';
          const isFieldNameStatus = row.original.fieldName === 'status';
          const isFieldNameUserIds = row.original.fieldName === 'userIds';

          const parsedPriorityOldValue =
            priorityLabels[oldValue as TaskPriority];

          const parsedStatusOldValue = statusLabels[oldValue as TaskStatus];

          return isFieldNamePriority ? (
            <Button
              disabled
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-white opacity-100!',
                oldValue === 'LOW' && 'bg-green-400',
                oldValue === 'MEDIUM' && 'bg-blue-400',
                oldValue === 'HIGH' && 'bg-yellow-400',
                oldValue === 'URGENT' && 'bg-red-400',
              )}
            >
              {parsedPriorityOldValue}
            </Button>
          ) : isFieldNameStatus ? (
            <Button
              disabled
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-white opacity-100!',
                oldValue === 'TODO' && 'bg-yellow-400',
                oldValue === 'IN_PROGRESS' && 'bg-blue-400',
                oldValue === 'REVIEW' && 'bg-purple-400',
                oldValue === 'DONE' && 'bg-green-400',
              )}
            >
              {parsedStatusOldValue}
            </Button>
          ) : isFieldNameUserIds && Array.isArray(oldValue) ? (
            oldValue.length > 0 ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Veja os participantes</Button>
                </PopoverTrigger>

                <PopoverContent>
                  <div className="flex flex-col gap-4">
                    {oldValue.map((user) => (
                      <div key={user.id} className="flex flex-col">
                        <div className="flex justify-between">
                          <span className="text-sm">{user.username}</span>
                          <span className="text-sm">{user.email}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Usuário desde
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {formatDateToBR(user.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <span className="text-destructive font-medium">
                Sem participantes
              </span>
            )
          ) : (
            oldValue
          );
        },
        meta: {
          nameInFilters: 'Valor antigo',
        },
      },
      {
        accessorKey: 'newValue',
        header: 'Valor atual',
        cell: ({ row }) => {
          const newValue = row.original.newValue;

          const isFieldNamePriority = row.original.fieldName === 'priority';
          const isFieldNameStatus = row.original.fieldName === 'status';
          const isFieldNameUserIds = row.original.fieldName === 'userIds';

          const parsedPriorityNewValue =
            priorityLabels[newValue as TaskPriority];

          const parsedStatusNewValue = statusLabels[newValue as TaskStatus];

          return isFieldNamePriority ? (
            <Button
              disabled
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-white opacity-100!',
                newValue === 'LOW' && 'bg-green-400',
                newValue === 'MEDIUM' && 'bg-blue-400',
                newValue === 'HIGH' && 'bg-yellow-400',
                newValue === 'URGENT' && 'bg-red-400',
              )}
            >
              {parsedPriorityNewValue}
            </Button>
          ) : isFieldNameStatus ? (
            <Button
              disabled
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-white opacity-100!',
                newValue === 'TODO' && 'bg-yellow-400',
                newValue === 'IN_PROGRESS' && 'bg-blue-400',
                newValue === 'REVIEW' && 'bg-purple-400',
                newValue === 'DONE' && 'bg-green-400',
              )}
            >
              {parsedStatusNewValue}
            </Button>
          ) : isFieldNameUserIds && Array.isArray(newValue) ? (
            newValue.length > 0 ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Veja os participantes</Button>
                </PopoverTrigger>

                <PopoverContent>
                  <div className="flex flex-col gap-4">
                    {newValue.map((user) => (
                      <div key={user.id} className="flex flex-col">
                        <div className="flex justify-between">
                          <span className="text-sm">{user.username}</span>
                          <span className="text-sm">{user.email}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Usuário desde
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {formatDateToBR(user.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <span className="text-destructive font-medium">
                Sem participantes
              </span>
            )
          ) : (
            newValue
          );
        },
        meta: {
          nameInFilters: 'Valor atual',
        },
      },
      {
        accessorKey: 'changedAt',
        header: 'Data/horário da atualização',
        cell: ({ row }) => formatDateToBRWithHour(row.original.changedAt),
        meta: {
          nameInFilters: 'Data/horário',
        },
      },
      {
        id: 'Actions',
        enableHiding: false,
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
                    <Button
                      asChild
                      variant="ghost"
                      disabled={thisTaskDeleted}
                      className={cn(
                        'w-full font-normal',
                        thisTaskDeleted && 'text-destructive! bg-transparent!',
                      )}
                    >
                      <Link
                        to="/tasks/$taskId"
                        params={{ taskId: row.original.taskId }}
                        className={cn(thisTaskDeleted && 'cursor-default')}
                      >
                        {thisTaskDeleted ? (
                          <div className="flex items-center gap-2">
                            <XIcon />
                            Indisponível
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <InfoIcon className="size-4 text-blue-400" />
                            Ver tarefa
                          </div>
                        )}
                      </Link>
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
