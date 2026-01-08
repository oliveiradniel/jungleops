import { truncateString } from '@/app/utils/truncate-string';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/view/components/ui/tooltip';

export function TextCellTooltip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger>{truncateString(text, 40)}</TooltipTrigger>

      <TooltipContent className="flex max-w-[400px]">
        <span className="text-center break-all">{text}</span>
      </TooltipContent>
    </Tooltip>
  );
}
