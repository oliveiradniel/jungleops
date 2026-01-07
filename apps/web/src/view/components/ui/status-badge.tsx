import { cn } from '@/lib/utils';

import { statusLabels } from '@/config/labels';

import type { TaskStatus } from '@challenge/shared';

export function StatusBadge({
  value,
  label,
}: {
  value: TaskStatus | undefined;
  label?: string | undefined;
}) {
  if (label === undefined) {
    return (
      <div
        className={cn(
          'rounded-md px-3 py-2 text-center text-sm font-medium text-white opacity-100!',
          value === 'TODO' && 'bg-yellow-400',
          value === 'IN_PROGRESS' && 'bg-blue-400',
          value === 'REVIEW' && 'bg-purple-400',
          value === 'DONE' && 'bg-green-400',
        )}
      >
        {statusLabels[value as TaskStatus]}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-md px-3 py-2 text-center text-sm font-medium text-white opacity-100!',
        value === 'TODO' && 'bg-yellow-400',
        value === 'IN_PROGRESS' && 'bg-blue-400',
        value === 'REVIEW' && 'bg-purple-400',
        value === 'DONE' && 'bg-green-400',
      )}
    >
      {label}
    </div>
  );
}
