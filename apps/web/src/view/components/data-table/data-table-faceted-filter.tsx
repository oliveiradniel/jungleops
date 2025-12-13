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

interface DataTableFacetedFilterProps<T extends string> {
  placeholder: string;
  column: string;
  labels: Record<T, string>;
}

export function DataTableFacetedFilter<T extends string>({
  placeholder,
  column,
  labels,
}: DataTableFacetedFilterProps<T>) {
  const { table } = useDataTable();

  const tableColumn = table.getColumn(column);
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
