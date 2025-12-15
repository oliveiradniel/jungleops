import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header';

import type { Column } from '@tanstack/react-table';

interface DateHeaderProps {
  column: Column<any>;
}

export function DateHeader({ column }: DateHeaderProps) {
  return (
    <DataTableColumnHeader title="Data/horário da criação" column={column} />
  );
}
