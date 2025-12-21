import { useDataTable } from './use-data-table';

import { XIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';

import type { Table } from '@tanstack/react-table';

interface DataTableUniqueFacetedFilterProps<T extends string> {
  table?: Table<any>;
  placeholder: string;
  column: string;
  labels: Record<T, string>;
}

export function DataTableUniqueFacetedFilter<T extends string>({
  table,
  placeholder,
  column,
  labels,
}: DataTableUniqueFacetedFilterProps<T>) {
  const context = useDataTable();

  const t = table ?? context?.table;

  if (!t) {
    throw new Error('DataTableUniqueFacetedFilter requires a table instance');
  }

  const tableColumn = t.getColumn(column);
  const facet = tableColumn?.getFacetedUniqueValues();
  const options = facet ? (Array.from(facet.keys()) as T[]) : [];

  const value = (tableColumn?.getFilterValue() as T) ?? '';

  return (
    <div className="flex items-center gap-1">
      <Select
        value={value}
        onValueChange={(value) => tableColumn?.setFilterValue(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {labels[option]}
                <span>({facet?.get(option)})</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {tableColumn?.getIsFiltered() && (
        <Button
          aria-label="Remover filtro"
          title="Remover filtro"
          variant="ghost"
          size="icon-lg"
          onClick={() => tableColumn?.setFilterValue(undefined)}
        >
          <XIcon />
        </Button>
      )}
    </div>
  );
}
