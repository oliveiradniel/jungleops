import type { Task } from '@/app/entities/task';
import type { ColumnDef } from '@tanstack/react-table';

export const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
  },
  {
    accessorKey: 'description',
  },
  {
    id: 'status',
    accessorFn: (row) => row.status.value,
  },
  {
    id: 'priority',
    accessorFn: (row) => row.priority.value,
  },
  {
    accessorKey: 'term',
  },
  {
    accessorKey: 'commentsCount',
  },
  {
    accessorKey: 'createdAt',
  },
];
