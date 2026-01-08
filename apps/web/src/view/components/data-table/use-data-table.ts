import { useContext } from 'react';
import { DataTableContext } from './data-table-context';

export function useDataTable() {
  const ctxValue = useContext(DataTableContext);

  if (!ctxValue) {
    throw new Error(`'useDataTable' should be used inside a DataTable.`);
  }

  return ctxValue;
}
