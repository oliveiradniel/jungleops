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
    accessorKey: 'status',
  },
  {
    accessorKey: 'priority',
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
