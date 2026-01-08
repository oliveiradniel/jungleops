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
  page: number;
  size: number;
  onPageNavigation: (page: number) => void;
  onSizePerPage: (size: number) => void;
}

export function PaginationControls({
  hasPrevious,
  hasNext,
  totalPages,
  isLoading,
  disabled,
  page,
  size,
  onPageNavigation,
  onSizePerPage,
}: DataTablePaginationProps) {
  const pageIndexes = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <small>Ir para a página:</small>

        <Select
          value={String(page)}
          onValueChange={(value) => onPageNavigation(Number(value))}
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
          onValueChange={(value) => onSizePerPage(Number(value))}
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
          onClick={() => onPageNavigation(1)}
        >
          <ChevronsLeftIcon className="size-4" />
        </Button>

        <Button
          disabled={!hasPrevious}
          variant="outline"
          size="sm"
          onClick={() => onPageNavigation(page - 1)}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>

        <Button
          disabled={!hasNext}
          variant="outline"
          size="sm"
          onClick={() => onPageNavigation(page + 1)}
        >
          <ChevronRightIcon className="size-4" />
        </Button>

        <Button
          disabled={!hasNext}
          variant="outline"
          size="sm"
          onClick={() => onPageNavigation(totalPages)}
        >
          <ChevronsRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
