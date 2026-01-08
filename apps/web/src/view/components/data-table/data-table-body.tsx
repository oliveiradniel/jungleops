import { useDataTable } from './use-data-table';

import { flexRender } from '@tanstack/react-table';

import { TableBody, TableCell, TableRow } from '../ui/table';

export function DataTableBody() {
  const { table } = useDataTable();

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
