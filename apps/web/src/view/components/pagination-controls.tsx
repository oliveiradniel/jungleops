import { useNavigate, useSearch } from '@tanstack/react-router';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/view/components/ui/select';

interface DataTablePaginationProps {
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
  isLoading?: boolean;
  disabled?: boolean;
}

export function PaginationControls({
  hasPrevious,
  hasNext,
  totalPages,
  isLoading,
  disabled,
}: DataTablePaginationProps) {
  const { page, size } = useSearch({ from: '/_authenticated/tasks' });
  const navigate = useNavigate();

  const pageIndexes = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  function handlePageNavigation(page: number) {
    navigate({ to: '/tasks', search: (old) => ({ ...old, page }) });
  }

  function handleSizePerPage(size: number) {
    navigate({ to: '/tasks', search: (old) => ({ ...old, size, page: 1 }) });
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <small>Ir para a página:</small>

        <Select
          value={String(page)}
          onValueChange={(value) => handlePageNavigation(Number(value))}
        >
          <SelectTrigger disabled={disabled}>
            <SelectValue>{page}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {pageIndexes?.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <small>Mostrar</small>

        <Select
          value={String(size)}
          onValueChange={(value) => handleSizePerPage(Number(value))}
        >
          <SelectTrigger disabled={disabled}>
            <SelectValue>{size}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {[10, 15].map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <small>
        Página {page} de {isLoading ? '...' : totalPages}
      </small>

      <div className="flex items-center gap-1">
        <Button
          disabled={!hasPrevious}
          variant="outline"
          size="sm"
          onClick={() => handlePageNavigation(1)}
        >
          <ChevronsLeftIcon className="size-4" />
        </Button>

        <Button
          disabled={!hasPrevious}
          variant="outline"
          size="sm"
          onClick={() => handlePageNavigation(page - 1)}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>

        <Button
          disabled={!hasNext}
          variant="outline"
          size="sm"
          onClick={() => handlePageNavigation(page + 1)}
        >
          <ChevronRightIcon className="size-4" />
        </Button>

        <Button
          disabled={!hasNext}
          variant="outline"
          size="sm"
          onClick={() => handlePageNavigation(totalPages)}
        >
          <ChevronsRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
