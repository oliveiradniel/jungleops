import { TextCellTooltip } from './text-cell-tooltip';

import type { Row } from '@tanstack/react-table';

export function TitleCell({ row }: { row: Row<any> }) {
  return <TextCellTooltip text={row.original.task.title} />;
}
