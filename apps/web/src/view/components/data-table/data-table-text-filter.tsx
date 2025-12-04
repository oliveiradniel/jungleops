import { useDataTable } from './use-data-table';

import { SearchIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';

interface DataTableTextFilterProps {
  placeholder?: string;
  column?: string;
}

export function DataTableTextFilter({
  placeholder,
  column,
}: DataTableTextFilterProps) {
  const { table } = useDataTable();

  if (column) {
    const tableColumn = table.getColumn(column);
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
      </InputGroup>
    );
  }

  return (
    <InputGroup>
      <InputGroupInput
        placeholder={placeholder}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
