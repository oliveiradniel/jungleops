import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header';

import type { Column } from '@tanstack/react-table';

interface TermHeaderProps {
  column: Column<any>;
}

export function TermHeader({ column }: TermHeaderProps) {
  return <DataTableColumnHeader title="Prazo" column={column} />;
}
