import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header';

import type { Column } from '@tanstack/react-table';

interface TitleHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any>;
}

export function TitleHeader({ column }: TitleHeaderProps) {
  return <DataTableColumnHeader title="Título" column={column} />;
}
