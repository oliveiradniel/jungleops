import { truncateString } from '@/app/utils/truncate-string';

import { CalendarClock, CalendarPlus, MessageSquare } from 'lucide-react';

import { Card, CardDescription, CardTitle } from '@/view/components/ui/card';
import { Separator } from '@/view/components/ui/separator';
import { TaskActionsPopover } from './task-actions-popover';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { StatusBadge } from '@/view/components/ui/status-badge';

import { type Table } from '@tanstack/react-table';
import type { Task } from '@/app/entities/task';

interface TasksCardProps {
  table: Table<Task>;
}

export function TasksCard({ table }: TasksCardProps) {
  return (
    <div className="animate-fade-in flex flex-wrap gap-2">
      {table.getRowModel().rows.map((row) => {
        const {
          id,
          title,
          description,
          priority,
          status,
          term,
          commentsCount,
          createdAt,
        } = row.original;

        return (
          <Card
            key={id}
            className="flex w-full max-w-[300px] justify-between p-4"
          >
            <div className="flex w-full items-start justify-between">
              <CardTitle>
                <p className="break-all">{truncateString(title, 60)}</p>
              </CardTitle>

              <TaskActionsPopover
                taskId={id}
                title={title}
                status={status}
                createdAt={createdAt}
              />
            </div>

            <CardDescription>{truncateString(description, 30)}</CardDescription>

            <div>
              <div className="flex justify-between gap-4">
                <StatusBadge value={status.value} label={status.label} />

                <PriorityBadge value={priority.value} label={priority.label} />
              </div>

              <Separator className="my-3" />

              <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-2">
                  <CalendarPlus className="size-4" />
                  <span className="text-xs">{createdAt}</span>
                </div>

                <div className="text-muted-foreground flex items-center gap-2">
                  <CalendarClock className="size-4" />
                  <span className="text-xs">{term}</span>
                </div>

                <div className="text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  <span className="text-xs">{commentsCount}</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
