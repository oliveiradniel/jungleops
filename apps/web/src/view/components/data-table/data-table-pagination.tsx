import { useDataTable } from './use-data-table';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function DataTablePagination() {
  const { table } = useDataTable();

  const currentPage = table.getState().pagination.pageIndex + 1;
  const rowsPerPage = table.getState().pagination.pageSize;
  const totalPages = table.getPageCount();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <small>Ir para a página:</small>

        <Select
          value={String(currentPage)}
          onValueChange={(value) => table?.setPageIndex(Number(value) - 1)}
        >
          <SelectTrigger>
            <SelectValue>{currentPage}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <small>Mostrar</small>

        <Select
          value={String(rowsPerPage)}
          onValueChange={(value) => table?.setPageSize(Number(value))}
        >
          <SelectTrigger>
            <SelectValue>{rowsPerPage}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {[5, 10, 15].map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <small>
        Página {currentPage} de {totalPages}
      </small>

      <div className="flex items-center gap-1">
        <Button
          disabled={!table.getCanPreviousPage()}
          variant="outline"
          size="sm"
          onClick={table.firstPage}
        >
          <ChevronsLeftIcon className="size-4" />
        </Button>

        <Button
          disabled={!table.getCanPreviousPage()}
          variant="outline"
          size="sm"
          onClick={table.previousPage}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>

        <Button
          disabled={!table.getCanNextPage()}
          variant="outline"
          size="sm"
          onClick={table.nextPage}
        >
          <ChevronRightIcon className="size-4" />
        </Button>

        <Button
          disabled={!table.getCanNextPage()}
          variant="outline"
          size="sm"
          onClick={table.lastPage}
        >
          <ChevronsRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
