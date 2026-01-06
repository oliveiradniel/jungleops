import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header';

import type { Column } from '@tanstack/react-table';

interface DescriptionHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any>;
}

export function DescriptionHeader({ column }: DescriptionHeaderProps) {
  return <DataTableColumnHeader title="Descrição" column={column} />;
}
