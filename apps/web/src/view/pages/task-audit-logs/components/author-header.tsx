import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header';

import type { Column } from '@tanstack/react-table';

interface AuthorHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any>;
}

export function AuthorHeader({ column }: AuthorHeaderProps) {
  return <DataTableColumnHeader title="Autor" column={column} />;
}
