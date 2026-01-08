import { Table } from '../ui/table';
import { DataTableHeader } from './data-table-header';
import { DataTableBody } from './data-table-body';

export function DataTableContent() {
  return (
    <Table>
      <DataTableHeader />

      <DataTableBody />
    </Table>
  );
}
