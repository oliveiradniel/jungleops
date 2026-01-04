import { useNavigate, useSearch } from '@tanstack/react-router';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
} from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu';

interface SortFilterProps {
  placeholder: string;
  disabled?: boolean;
}

type Sort = {
  orderBy: 'created-at' | 'term';
  order: 'asc' | 'desc';
};

export function SortFilter({ placeholder, disabled }: SortFilterProps) {
  const { orderBy, order } = useSearch({
    from: '/_authenticated/_layout/tasks',
  });
  const navigate = useNavigate();

  function handleSort({ orderBy, order }: Sort) {
    navigate({
      to: '/tasks',
      search: (old) => ({ ...old, orderBy, order }),
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          className="data-[state=open]:bg-accent font-normal"
        >
          {(!order || order === 'asc') && (
            <CalendarArrowUpIcon className="text-muted-foreground size-3" />
          )}

          {order === 'desc' && (
            <CalendarArrowDownIcon className="text-muted-foreground size-3" />
          )}

          <span>
            {placeholder}
            {`: ${orderBy === 'created-at' ? 'data de criação' : 'data de entrega'}`}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuLabel className="text-primary text-xs">
          Data de entrega
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => handleSort({ orderBy: 'term', order: 'asc' })}
            className="text-xs"
          >
            <ArrowUpIcon className="text-muted-foreground size-3" />
            Asc
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => handleSort({ orderBy: 'term', order: 'desc' })}
            className="text-xs"
          >
            <ArrowDownIcon className="text-muted-foreground size-3" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-primary text-xs">
          Data de criação
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => handleSort({ orderBy: 'created-at', order: 'asc' })}
            className="text-xs"
          >
            <ArrowUpIcon className="text-muted-foreground size-3" />
            Asc
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() =>
              handleSort({ orderBy: 'created-at', order: 'desc' })
            }
            className="text-xs"
          >
            <ArrowDownIcon className="text-muted-foreground size-3" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
