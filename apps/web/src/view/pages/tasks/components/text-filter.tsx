import { useEffect, useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useDebounce } from '@/app/hooks/use-debounce';

import { SearchIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/view/components/ui/input-group';

interface TextFilterProps {
  numberOfTasksFound?: number;
  disabled?: boolean;
}

export function TextFilter({ numberOfTasksFound, disabled }: TextFilterProps) {
  const { q } = useSearch({ from: '/_authenticated/_layout/tarefas' });
  const navigate = useNavigate();

  const [search, setSearch] = useState(q);
  const debouncedValue = useDebounce(search);

  useEffect(() => {
    navigate({
      to: '/tarefas',
      search: (old) => ({
        ...old,
        q: debouncedValue,
      }),
    });
  }, [debouncedValue, navigate]);

  return (
    <InputGroup>
      <InputGroupInput
        disabled={disabled}
        placeholder="Digite o título ou descrição de uma tarefa"
        value={search ?? ''}
        onChange={(event) => setSearch(event.target.value)}
      />

      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>

      {q && !disabled && (
        <InputGroupAddon align="inline-end" className="animate-fade-in">
          ({numberOfTasksFound ?? 0})
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
