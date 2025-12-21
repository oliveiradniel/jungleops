import { useDataTable } from './use-data-table';

import { Filter, XIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CheckboxIndicator, CheckboxItem } from '../ui/checkbox';
import { Label } from '../ui/label';

import type { Table } from '@tanstack/react-table';

interface DataTableManyFacetedFilterProps<T extends string> {
  table?: Table<any>;
  placeholder: string;
  column: string;
  labels: Record<T, string>;
}

export function DataTableManyFacetedFilter<T extends string>({
  table,
  placeholder,
  column,
  labels,
}: DataTableManyFacetedFilterProps<T>) {
  const context = useDataTable();

  const t = table ?? context?.table;

  if (!t) {
    throw new Error('DataTableManyFacetedFilter requires a table instance');
  }

  const tableColumn = t.getColumn(column);
  const facet = tableColumn?.getFacetedUniqueValues();
  const options = facet ? (Array.from(facet.keys()) as T[]) : [];

  const value = (tableColumn?.getFilterValue() as T[]) ?? [];

  return (
    <div className="flex items-center gap-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Abrir filtros"
            variant="outline"
            className="font-normal"
          >
            <Filter className="size-3" />
            {placeholder}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-44">
          <div className="space-y-2">
            {options.map((option) => {
              const checked = value.includes(option);

              return (
                <div key={option} className="flex items-center gap-2">
                  <CheckboxItem
                    checked={checked}
                    onCheckedChange={(isChecked) => {
                      const newValue = isChecked
                        ? [...value, option]
                        : value.filter((v) => v !== option);

                      tableColumn?.setFilterValue(
                        newValue.length ? newValue : undefined,
                      );
                    }}
                  >
                    <CheckboxIndicator />

                    <Label htmlFor="low" className="cursor-pointer">
                      {labels[option]}
                    </Label>
                  </CheckboxItem>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

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
