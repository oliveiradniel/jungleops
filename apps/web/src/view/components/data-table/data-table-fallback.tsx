import { Skeleton } from '../ui/skeleton';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table';

interface DataTableFallbackProps {
  fallbackColumns: string[];
}

export function DataTableFallback({ fallbackColumns }: DataTableFallbackProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {fallbackColumns.map((fallbackColumn, index) => (
            <TableHead key={index}>{fallbackColumn}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {fallbackColumns.map((_, cellIndex) => (
              <TableCell key={cellIndex}>
                <Skeleton className="h-10" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
