import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header';

import type { Column } from '@tanstack/react-table';

interface DateHeaderProps {
  title: string;
  column: Column<any>;
}

export function DateHeader({ title, column }: DateHeaderProps) {
  return <DataTableColumnHeader title={title} column={column} />;
}
