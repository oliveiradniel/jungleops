import { SearchIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/view/components/ui/input-group';

import { useNavigate, useSearch } from '@tanstack/react-router';

interface TextFilterProps {
  numberOfTasksFound?: number;
}

export function TextFilter({ numberOfTasksFound }: TextFilterProps) {
  const { q } = useSearch({ from: '/_authenticated/tasks' });
  const navigate = useNavigate();

  return (
    <InputGroup>
      <InputGroupInput
        placeholder="Digite o título ou descrição de uma tarefa"
        value={q ?? ''}
        onChange={(event) =>
          navigate({
            to: '/tasks',
            search: (old) => ({ ...old, q: event.target.value }),
          })
        }
      />

      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>

      {q && (
        <InputGroupAddon align="inline-end" className="animate-fade-in">
          ({numberOfTasksFound ?? 0})
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
