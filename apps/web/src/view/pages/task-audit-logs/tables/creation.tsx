import { Link } from '@tanstack/react-router';

import { useTasks } from '@/app/hooks/use-tasks';
import { useListTaskCreationAuditLogQuery } from '@/app/hooks/queries/use-list-task-creation-audit-log-query';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';

import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';
import { truncateString } from '@/app/utils/truncate-string';
import { priorityLabels, statusLabels } from '@/config/labels';
import { cn } from '@/lib/utils';

import notFoundImage from '@/assets/images/tasks-not-found.svg';
import { Plus } from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';
import { Separator } from '@/view/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/view/components/ui/table';
import { Skeleton } from '@/view/components/ui/skeleton';

import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';
import type { Task } from '@challenge/shared';

export function TaskCreationAuditLogTable() {
  const { handleOpenNewTaskSheet } = useTasks();

  const { taskCreationAuditLogsList, isTaskCreationAuditLogsLoading } =
    useListTaskCreationAuditLogQuery();
  const { taskDeletionAuditLogsList, isTaskDeletionAuditLogsLoading } =
    useListTaskDeletionAuditLogQuery();

  const deletedTaskIds = taskDeletionAuditLogsList.map((log) => log.taskId);

  return (
    <div className="h-full">
      {isTaskCreationAuditLogsLoading && (
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 12 }).map(() => (
            <Skeleton className="h-10" />
          ))}
        </div>
      )}

      {taskCreationAuditLogsList.length === 0 && (
        <div className="animate-fade-in flex h-full flex-col items-center justify-center gap-6">
          <img src={notFoundImage} alt="" className="h-60" />

          <p className="max-w-[500px] text-center">
            Não há registro de nenhuma tarefa criada para ser listada na
            auditoria de criação. Que tal adicionar uma agora e melhorar o seu{' '}
            <span className="text-primary font-medium">fluxo de trabalho</span>{' '}
            e{' '}
            <span className="text-primary font-medium">controle de prazos</span>
            ?
          </p>

          <Button onClick={handleOpenNewTaskSheet} className="p-6!">
            <Plus className="size-4!" /> Adicionar tarefa
          </Button>
        </div>
      )}

      {taskCreationAuditLogsList.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Autor</TableHead>

              <TableHead>Título</TableHead>

              <TableHead>Valores na criação</TableHead>

              <TableHead>Data e horário da criação</TableHead>
            </TableRow>
          </TableHeader>

          {!isTaskCreationAuditLogsLoading && (
            <TableBody>
              {taskCreationAuditLogsList.map(
                ({ taskId, taskTitle, authorData, newValue, changedAt }) => {
                  const taskData = JSON.parse(newValue!) as Task;

                  const thisTaskDeleted = deletedTaskIds.includes(taskId);

                  return (
                    <TableRow key={taskId}>
                      <TableCell className="flex flex-col">
                        <span>{authorData.username}</span>
                        <span className="text-muted-foreground text-xs">
                          {authorData.email}
                        </span>
                      </TableCell>

                      <TableCell>{taskTitle}</TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              disabled={isTaskDeletionAuditLogsLoading}
                            >
                              Veja os valores
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent>
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

                            <Button
                              variant={
                                thisTaskDeleted ? 'destructive' : 'default'
                              }
                              disabled={thisTaskDeleted}
                              className="mt-4"
                            >
                              <Link to={`/tasks/${taskId}`}>
                                {thisTaskDeleted
                                  ? 'Indisponível'
                                  : 'Ver informações'}
                              </Link>
                            </Button>
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
      )}
    </div>
  );
}
