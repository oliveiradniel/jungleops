import { priorityLabels } from '@/config/labels';
import { cn } from '@/lib/utils';

import type { TaskPriority } from '@/app/enums/TaskPriority';

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const parsedPriority = priorityLabels[priority as TaskPriority];

  return (
    <div
      className={cn(
        'rounded-md px-3 py-2 text-center text-sm font-medium text-white opacity-100!',
        priority === 'LOW' && 'bg-green-400',
        priority === 'MEDIUM' && 'bg-blue-400',
        priority === 'HIGH' && 'bg-yellow-400',
        priority === 'URGENT' && 'bg-red-400',
      )}
    >
      {parsedPriority}
    </div>
  );
}
