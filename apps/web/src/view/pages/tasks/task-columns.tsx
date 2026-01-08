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
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true;

      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    id: 'priority',
    accessorFn: (row) => row.priority.value,
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true;

      return filterValue.includes(row.getValue(columnId));
    },
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
