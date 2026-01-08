import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header';

import type { Column } from '@tanstack/react-table';

interface DateHeaderProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any>;
}

export function DateHeader({ title, column }: DateHeaderProps) {
  return <DataTableColumnHeader title={title} column={column} />;
}
