import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';

import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';
import { truncateString } from '@/app/utils/truncate-string';
import { priorityLabels, statusLabels } from '@/config/labels';
import { cn } from '@/lib/utils';

import { Button } from '@/view/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';
import { Separator } from '@/view/components/ui/separator';
import { Skeleton } from '@/view/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/view/components/ui/table';

import type { Task } from '@challenge/shared';
import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';

export function TaskDeletionAuditLogTable() {
  const { taskDeletionAuditLogsList, isTaskDeletionAuditLogsLoading } =
    useListTaskDeletionAuditLogQuery();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>

            <TableHead>Valores na exclusão</TableHead>

            <TableHead>Data e horário da exclusão</TableHead>
          </TableRow>
        </TableHeader>

        {!isTaskDeletionAuditLogsLoading && (
          <TableBody>
            {taskDeletionAuditLogsList.map(
              ({ taskTitle, oldValue, changedAt }) => {
                const taskData = JSON.parse(oldValue!) as Task;

                return (
                  <TableRow>
                    <TableCell>{taskTitle}</TableCell>

                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">Veja os valores</Button>
                        </PopoverTrigger>

                        <PopoverContent>
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between text-sm">
                              <span>Título: </span>
                              <span>{truncateString(taskData.title, 20)}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <span>Descrição:</span>
                              <span className="text-sm">
                                {truncateString(taskData.description, 20)}
                              </span>
                            </div>

                            <Separator className="my-2" />

                            <span className="text-sm">
                              Prazo para término:{' '}
                              {formatDateToBR(taskData?.term!)}
                            </span>

                            <div className="mt-2 flex items-center gap-2">
                              <span
                                className={cn(
                                  'rounded-md px-3 py-2 text-sm font-medium text-white',
                                  taskData?.priority === 'LOW' &&
                                    'bg-green-400',
                                  taskData?.priority === 'MEDIUM' &&
                                    'bg-blue-400',
                                  taskData?.priority === 'HIGH' &&
                                    'bg-yellow-400',
                                  taskData?.priority === 'URGENT' &&
                                    'bg-red-400',
                                )}
                              >
                                {
                                  priorityLabels[
                                    taskData.priority as TaskPriority
                                  ]
                                }
                              </span>

                              <span
                                className={cn(
                                  'rounded-md px-3 py-2 text-sm font-medium text-white',
                                  taskData?.status === 'TODO' &&
                                    'bg-yellow-400',
                                  taskData?.status === 'IN_PROGRESS' &&
                                    'bg-blue-400',
                                  taskData?.status === 'REVIEW' &&
                                    'bg-purple-400',
                                  taskData?.status === 'DONE' && 'bg-green-400',
                                )}
                              >
                                {statusLabels[taskData?.status as TaskStatus]}
                              </span>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>

                    <TableCell>{formatDateToBRWithHour(changedAt)}</TableCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
        )}
      </Table>

      {isTaskDeletionAuditLogsLoading && (
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 12 }).map(() => (
            <Skeleton className="h-10" />
          ))}
        </div>
      )}
    </>
  );
}
