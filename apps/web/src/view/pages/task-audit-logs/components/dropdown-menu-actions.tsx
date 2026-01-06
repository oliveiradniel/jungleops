import { useTaskAuditLog } from '../context/use-task-audit-log';

import { cn } from '@/lib/utils';

import { EllipsisIcon, InfoIcon, Trash2Icon } from 'lucide-react';

import { Link } from '@tanstack/react-router';
import { Button } from '@/view/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu';

interface DropdownMenuActionsProps {
  logId: string;
  taskId?: string;
  taskAuditLogType: 'creation' | 'deletion' | 'update';
  thisTaskDeleted?: boolean;
}

export function DropdownMenuActions({
  logId,
  taskId,
  taskAuditLogType,
  thisTaskDeleted,
}: DropdownMenuActionsProps) {
  const { handleOpenDeleteTaskAuditLogDialog } = useTaskAuditLog();

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <EllipsisIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <div>
            {(!thisTaskDeleted || taskAuditLogType === 'deletion') && (
              <Button
                asChild
                variant="ghost"
                className={cn('w-full font-normal')}
              >
                <Link to="/tasks/$taskId" params={{ taskId: taskId! }}>
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
                handleOpenDeleteTaskAuditLogDialog({
                  selectedLogId: logId,
                  type: taskAuditLogType,
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
}
