import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';

import { DataTableContext } from './data-table-context';

interface DataTableProps<TData> {
  children: React.ReactNode;
  data: TData[];
  columns: ColumnDef<TData>[];
}

export function DataTable<TData>({
  children,
  data,
  columns,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <DataTableContext.Provider value={{ table }}>
      {children}
    </DataTableContext.Provider>
  );
}
