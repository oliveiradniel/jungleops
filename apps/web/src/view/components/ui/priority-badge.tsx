import { cn } from '@/lib/utils';

import { priorityLabels } from '@/config/labels';

import { TaskPriority } from '@challenge/shared';

export function PriorityBadge({
  value,
  label,
}: {
  value: TaskPriority | undefined;
  label?: string | undefined;
}) {
  if (label === undefined) {
    return (
      <div
        className={cn(
          'rounded-md px-3 py-2 text-center text-sm font-medium text-white opacity-100!',
          value === TaskPriority.LOW && 'bg-green-400',
          value === TaskPriority.MEDIUM && 'bg-blue-400',
          value === TaskPriority.HIGH && 'bg-yellow-400',
          value === TaskPriority.URGENT && 'bg-red-400',
        )}
      >
        {priorityLabels[value as TaskPriority]}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-md px-3 py-2 text-center text-sm font-medium text-white opacity-100!',
        value === TaskPriority.LOW && 'bg-green-400',
        value === TaskPriority.MEDIUM && 'bg-blue-400',
        value === TaskPriority.HIGH && 'bg-yellow-400',
        value === TaskPriority.URGENT && 'bg-red-400',
      )}
    >
      {label}
    </div>
  );
}
