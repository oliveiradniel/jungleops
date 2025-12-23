import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
} from '@tanstack/react-table';

import { DataTableContext } from './data-table-context';

interface DataTableProps<TData> {
  children: React.ReactNode;
  data: TData[];
  columns: ColumnDef<TData>[];
  pagination?: PaginationState;
}

export function DataTable<TData>({
  children,
  data,
  columns,
  pagination,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <DataTableContext.Provider value={{ table }}>
      {children}
    </DataTableContext.Provider>
  );
}
