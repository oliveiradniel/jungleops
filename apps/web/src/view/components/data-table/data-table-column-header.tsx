import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

import type { Column } from '@tanstack/react-table';

interface DataTableColumnHeaderProps {
  title: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any>;
}

export function DataTableColumnHeader({
  title,
  column,
}: DataTableColumnHeaderProps) {
  if (!column.getCanSort()) {
    return title;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="data-[state=open]:bg-accent -ml-3"
        >
          {title}

          {!column.getIsSorted() && (
            <ChevronsUpDownIcon className="text-muted-foreground size-3" />
          )}

          {column.getIsSorted() === 'asc' && (
            <ArrowUpIcon className="text-muted-foreground size-3" />
          )}

          {column.getIsSorted() === 'desc' && (
            <ArrowDownIcon className="text-muted-foreground size-3" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem onSelect={() => column.toggleSorting(false)}>
          <ArrowUpIcon className="text-muted-foreground size-3" />
          Asc
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => column.toggleSorting(true)}>
          <ArrowDownIcon className="text-muted-foreground size-3" />
          Desc
        </DropdownMenuItem>

        {column.getCanHide() && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={() => column.toggleVisibility(false)}>
              <EyeOffIcon className="text-muted-foreground size-3" />
              Hide
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
