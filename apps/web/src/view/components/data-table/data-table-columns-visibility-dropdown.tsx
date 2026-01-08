import { useDataTable } from './use-data-table';

import { Settings2Icon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export function DataTableColumnsVisibilityDropdown() {
  const { table } = useDataTable();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Visualizar <Settings2Icon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {table.getAllColumns().map((column) =>
          column.getCanHide() ? (
            <DropdownMenuCheckboxItem
              checked={column.getIsVisible()}
              onCheckedChange={column.toggleVisibility}
            >
              {column.columnDef.meta?.nameInFilters}
            </DropdownMenuCheckboxItem>
          ) : null,
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
