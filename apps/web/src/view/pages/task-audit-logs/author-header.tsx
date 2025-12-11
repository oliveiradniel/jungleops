import { DataTableColumnHeader } from '@/view/components/data-table/data-table-column-header';

import type { Column } from '@tanstack/react-table';

interface AuthorHeaderProps {
  column: Column<any>;
}

export function AuthorHeader({ column }: AuthorHeaderProps) {
  return <DataTableColumnHeader title="Autor" column={column} />;
}
