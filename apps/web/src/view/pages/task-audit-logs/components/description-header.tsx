import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header';

import type { Column } from '@tanstack/react-table';

interface DescriptionHeaderProps {
  column: Column<any>;
}

export function DescriptionHeader({ column }: DescriptionHeaderProps) {
  return <DataTableColumnHeader title="Descrição" column={column} />;
}
