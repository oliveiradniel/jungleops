import type { Table } from '@tanstack/react-table';
import { createContext } from 'react';

interface DataTableContextValues {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
}

export const DataTableContext = createContext({} as DataTableContextValues);
