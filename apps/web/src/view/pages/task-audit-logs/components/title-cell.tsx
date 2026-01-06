import { TextCellTooltip } from './text-cell-tooltip';

import type { Row } from '@tanstack/react-table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TitleCell({ row }: { row: Row<any> }) {
  return <TextCellTooltip text={row.original.task.title} />;
}
