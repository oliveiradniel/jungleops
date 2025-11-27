import { useListTaskUpdateAuditLogQuery } from '@/app/hooks/queries/use-list-task-update-audit-log-query';

import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';
import { fieldLabels, priorityLabels, statusLabels } from '@/config/labels';
import { cn } from '@/lib/utils';

import { Skeleton } from '@/view/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/view/components/ui/table';

import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';
import type { FieldName } from '@challenge/shared';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';
import { Button } from '@/view/components/ui/button';

export function TaskUpdateAuditLogTable() {
  const { taskUpdateAuditLogsList, isTaskUpdateAuditLogsLoading } =
    useListTaskUpdateAuditLogQuery();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>

            <TableHead>Campo</TableHead>

            <TableHead>Valor antigo</TableHead>

            <TableHead>Valor atual</TableHead>

            <TableHead>Data e horário da atualização</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {taskUpdateAuditLogsList.map(
            ({ taskTitle, fieldName, oldValue, newValue, changedAt }) => {
              const isFieldNamePriority = fieldName === 'priority';
              const isFieldNameStatus = fieldName === 'status';
              const isFieldNameUserIds = fieldName === 'userIds';

              const parsedPriorityOldValue =
                priorityLabels[oldValue as TaskPriority];
              const parsedPriorityNewValue =
                priorityLabels[newValue as TaskPriority];

              const parsedStatusOldValue = statusLabels[oldValue as TaskStatus];
              const parsedStatusNewValue = statusLabels[newValue as TaskStatus];

              return (
                <TableRow className="m-6 p-6">
                  <TableCell className="font-semibold">{taskTitle}</TableCell>
                  <TableCell>{fieldLabels[fieldName as FieldName]}</TableCell>
                  <TableCell>
                    {isFieldNamePriority ? (
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
                            <Button
                              variant="outline"
                              disabled={isTaskUpdateAuditLogsLoading}
                            >
                              Veja os participantes
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent>
                            <div className="flex flex-col gap-4">
                              {oldValue.map((user) => (
                                <div key={user.id} className="flex flex-col">
                                  <div className="flex justify-between">
                                    <span className="text-sm">
                                      {user.username}
                                    </span>
                                    <span className="text-sm">
                                      {user.email}
                                    </span>
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
                    )}
                  </TableCell>

                  <TableCell>
                    {isFieldNamePriority ? (
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
                            <Button
                              variant="outline"
                              disabled={isTaskUpdateAuditLogsLoading}
                            >
                              Veja os participantes
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent>
                            <div className="flex flex-col gap-4">
                              {newValue.map((user) => (
                                <div key={user.id} className="flex flex-col">
                                  <div className="flex justify-between">
                                    <span className="text-sm">
                                      {user.username}
                                    </span>
                                    <span className="text-sm">
                                      {user.email}
                                    </span>
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
                    )}
                  </TableCell>

                  <TableCell>{formatDateToBRWithHour(changedAt)}</TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>

      {isTaskUpdateAuditLogsLoading && (
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 12 }).map(() => (
            <Skeleton className="h-10" />
          ))}
        </div>
      )}
    </>
  );
}
