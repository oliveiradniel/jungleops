import { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { Filter, XIcon } from 'lucide-react';

import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CheckboxIndicator, CheckboxItem } from './ui/checkbox';
import { Label } from './ui/label';

interface FacetItem<T extends string> {
  value: T;
  count: number;
}

interface ManyFacetedTasksFilterProps<T extends string> {
  param: 'status' | 'priority';
  facets?: FacetItem<T>[];
  placeholder: string;
  labels: Record<T, string>;
  disabled?: boolean;
}

export function ManyFacetedTasksFilter<T extends string>({
  param,
  placeholder,
  facets,
  labels,
  disabled,
}: ManyFacetedTasksFilterProps<T>) {
  const navigate = useNavigate();
  const search = useSearch({ from: '/_authenticated/_layout/tasks' });

  const [selectedFilters, setSelectedFilters] = useState<T[]>(
    search[param]?.split(',').map((value) => value.toUpperCase() as T) ?? [],
  );

  function handleAddFilter(filter: T) {
    setSelectedFilters((prevState) => {
      const values = prevState.includes(filter)
        ? prevState.filter((v) => v !== filter)
        : [...prevState, filter];

      const search =
        values.length > 0
          ? values.map((v) => v.toLowerCase()).join(',')
          : undefined;

      navigate({
        to: '/tasks',
        search: (old) => ({
          ...old,
          [param]: search,
          page: 1,
        }),
      });

      return values;
    });
  }

  function removeFilters() {
    setSelectedFilters([]);

    navigate({
      to: '/tasks',
      search: (old) => ({ ...old, [param]: undefined, page: 1 }),
    });
  }

  return (
    <div className="flex items-center gap-1">
      <Popover>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            aria-label="Abrir filtros"
            variant="outline"
            className="font-normal"
          >
            <Filter className="size-3" />
            {placeholder}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-52">
          <div className="space-y-2">
            {facets?.map((facet) => {
              const checked = selectedFilters.includes(facet.value);

              return (
                <div key={facet.value} className="flex items-center gap-2">
                  <CheckboxItem
                    checked={checked}
                    onCheckedChange={() => handleAddFilter(facet.value)}
                  >
                    <CheckboxIndicator />

                    <Label htmlFor="low" className="cursor-pointer">
                      <span>{labels[facet.value]}</span>

                      <span>({facet.count})</span>
                    </Label>
                  </CheckboxItem>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      {selectedFilters.length > 0 && (
        <Button
          aria-label="Remover filtros"
          title="Remover filtros"
          variant="ghost"
          size="icon-sm"
          onClick={removeFilters}
        >
          <XIcon className="text-red-400" />
        </Button>
      )}
    </div>
  );
}
