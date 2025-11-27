import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Outlet, useLocation } from '@tanstack/react-router';

import { FilePen, Filter, PlusSquare, Trash2 } from 'lucide-react';

import { Button } from '@/view/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';

export function TaskAuditLogs() {
  const { navigate } = useRouter();
  const location = useLocation();

  const optionsTaskAuditLogFilterAction = [
    {
      id: crypto.randomUUID(),
      label: 'Criação',
      pathname: '/tasks/audit-logs/creation',
      icon: PlusSquare,
    },
    {
      id: crypto.randomUUID(),
      label: 'Atualização',
      pathname: '/tasks/audit-logs/update',
      icon: FilePen,
    },
    {
      id: crypto.randomUUID(),
      label: 'Exclusão',
      pathname: '/tasks/audit-logs/deletion',
      icon: Trash2,
    },
  ];

  useEffect(() => {
    if (location.pathname === '/tasks/audit-logs') {
      navigate({ to: '/tasks/audit-logs/creation' });
    }
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-6 p-6">
      <h1 className="text-2xl">
        {location.pathname === '/tasks/audit-logs/creation' &&
          'Criações de tarefas'}
        {location.pathname === '/tasks/audit-logs/update' &&
          'Alteração de tarefas'}
        {location.pathname === '/tasks/audit-logs/deletion' &&
          'Exclusão de tarefas'}
        {location.pathname === '/tasks/audit-logs' &&
          'Selecione um tipo de ação'}
      </h1>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Abrir filtros"
            variant="outline"
            className="max-w-60"
          >
            Filtrar pelo tipo de ação
            <Filter />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-60">
          <div className="flex flex-col gap-1">
            {optionsTaskAuditLogFilterAction.map((option) => {
              const isActive = location.pathname === option.pathname;

              return (
                <Button
                  key={option.id}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => navigate({ to: option.pathname })}
                  className="text-muted-foreground justify-start"
                >
                  {option.icon && <option.icon />}
                  {option.label}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      <Outlet />
    </div>
  );
}
