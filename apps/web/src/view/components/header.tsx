import { Search } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/view/components/ui/input-group';

import type { TaskWithCommentCount } from '@challenge/shared';

interface HeaderProps {
  children?: React.ReactNode;
  searchInput: string;
  placeholderInput: string;
  itemsCount: number;
  itemsList: TaskWithCommentCount[];
  isLoading: boolean;
  handleChangeSearchInput: (value: string) => void;
}

export function Header({
  children,
  searchInput,
  placeholderInput,
  itemsList,
  isLoading,
  itemsCount,
  handleChangeSearchInput,
}: HeaderProps) {
  return (
    <header className="flex flex-col items-start justify-between gap-2 xl:flex-row">
      <InputGroup className="w-full max-w-[480px]">
        <InputGroupInput
          disabled={isLoading || itemsCount === 0}
          placeholder={placeholderInput}
          value={searchInput}
          onChange={(event) => handleChangeSearchInput(event.target.value)}
          className="w-full pl-10"
        />

        <InputGroupAddon>
          <Search className="size-4" />
        </InputGroupAddon>

        {searchInput.length > 0 && (
          <InputGroupAddon align="inline-end" className="animate-fade-in">
            ({itemsList.length})
          </InputGroupAddon>
        )}
      </InputGroup>

      {children}
    </header>
  );
}
