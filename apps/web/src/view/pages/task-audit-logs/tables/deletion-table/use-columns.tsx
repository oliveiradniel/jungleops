import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { truncateString } from '@/app/utils/truncate-string';
import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';
import { priorityLabels, statusLabels } from '@/config/labels';

import { Button } from '@/view/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/view/components/ui/popover';
import { Separator } from '@/view/components/ui/separator';

import type { ColumnDef } from '@tanstack/react-table';
import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';
import type { ListDeletionTaskAuditLogWithAuthorData } from '@challenge/shared';

export function useColumns(): ColumnDef<ListDeletionTaskAuditLogWithAuthorData>[] {
  return useMemo(
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
      },
      {
        accessorKey: 'taskTitle',
        header: 'Título',
        cell: ({ row }) => truncateString(row.original.taskTitle, 40),
      },
      {
        accessorKey: 'values',
        header: 'Valores na exclusão',
        cell: ({ row }) => {
          const values = JSON.parse(row.original.values);

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Veja os valores</Button>
              </PopoverTrigger>

              <PopoverContent>
                <div className="flex items-center justify-between text-sm">
                  <span>Título:</span>
                  <span>{truncateString(values.title, 20)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span>Descrição:</span>
                  <span>{truncateString(values.description, 20)}</span>
                </div>

                <Separator className="my-2" />

                <span className="text-sm">
                  Prazo: {formatDateToBR(values.term)}
                </span>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium text-white',
                      values.priority === 'LOW' && 'bg-green-400',
                      values.priority === 'MEDIUM' && 'bg-blue-400',
                      values.priority === 'HIGH' && 'bg-yellow-400',
                      values.priority === 'URGENT' && 'bg-red-400',
                    )}
                  >
                    {priorityLabels[values.priority as TaskPriority]}
                  </span>

                  <span
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium text-white',
                      values.status === 'TODO' && 'bg-yellow-400',
                      values.status === 'IN_PROGRESS' && 'bg-blue-400',
                      values.status === 'REVIEW' && 'bg-purple-400',
                      values.status === 'DONE' && 'bg-green-400',
                    )}
                  >
                    {statusLabels[values.status as TaskStatus]}
                  </span>
                </div>
              </PopoverContent>
            </Popover>
          );
        },
      },
      {
        accessorKey: 'changedAt',
        header: 'Data/horário da criação',
        cell: ({ row }) => formatDateToBRWithHour(row.original.changedAt),
      },
    ],
    [],
  );
}
