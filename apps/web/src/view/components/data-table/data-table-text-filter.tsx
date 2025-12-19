import { useDataTable } from './use-data-table';

import { SearchIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';

import type { Table } from '@tanstack/react-table';

interface DataTableTextFilterProps {
  table?: Table<any>;
  placeholder?: string;
  column?: string;
}

export function DataTableTextFilter({
  table,
  placeholder,
  column,
}: DataTableTextFilterProps) {
  const context = useDataTable();

  const t = table ?? context?.table;

  if (!t) {
    throw new Error('DataTableTextFilter requires a table instance');
  }

  if (column) {
    const tableColumn = t.getColumn(column);
    const value = tableColumn?.getFilterValue() as string;

    return (
      <InputGroup>
        <InputGroupInput
          placeholder={placeholder}
          value={value}
          onChange={(event) => tableColumn?.setFilterValue(event.target.value)}
        />

        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>

        {value?.length > 0 && (
          <InputGroupAddon align="inline-end" className="animate-fade-in">
            ({t.getRowCount()})
          </InputGroupAddon>
        )}
      </InputGroup>
    );
  }

  return (
    <InputGroup>
      <InputGroupInput
        placeholder={placeholder}
        onChange={(event) => t.setGlobalFilter(event.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
