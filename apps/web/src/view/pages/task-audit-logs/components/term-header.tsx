import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header';

import type { Column } from '@tanstack/react-table';

interface TermHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any>;
}

export function TermHeader({ column }: TermHeaderProps) {
  return <DataTableColumnHeader title="Prazo" column={column} />;
}
