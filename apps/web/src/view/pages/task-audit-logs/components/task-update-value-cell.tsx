import { formatDateToBR } from '@/app/utils/format-date-br';

import { Button } from '@/view/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { StatusBadge } from '@/view/components/ui/status-badge';
import { TextCellTooltip } from './text-cell-tooltip';

import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';
import type { UserWithoutPassword } from '@challenge/shared';

interface TaskUpdateValueCellProps {
  value: string | UserWithoutPassword[];
  fieldName: string;
}

export function TaskUpdateValueCell({
  value,
  fieldName,
}: TaskUpdateValueCellProps) {
  const isFieldNamePriority = fieldName === 'priority';
  const isFieldNameStatus = fieldName === 'status';
  const isFieldNameUserIds = fieldName === 'userIds';

  if (isFieldNamePriority)
    return <PriorityBadge priority={value as TaskPriority} />;

  if (isFieldNameStatus) return <StatusBadge status={value as TaskStatus} />;

  if (Array.isArray(value) && isFieldNameUserIds) {
    if (value.length === 0) {
      return (
        <span className="text-destructive font-medium">Sem participantes</span>
      );
    }

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Veja os participantes</Button>
        </PopoverTrigger>

        <PopoverContent>
          <div className="flex flex-col gap-4">
            {value.map((user) => (
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
    );
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return <TextCellTooltip text={value} />;
  }

  return JSON.stringify(value);
}
