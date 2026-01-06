import { useEffect } from 'react';
import { useRouter, Outlet, useLocation } from '@tanstack/react-router';
import { TaskAuditLogProvider } from './context/task-audit-log-provider';

import { FilePen, PlusSquare, Trash2 } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/view/components/ui/select';

export function TaskAuditLogs() {
  const { navigate } = useRouter();
  const { pathname } = useLocation();

  const textLabel =
    pathname === '/tasks/audit-logs/creation'
      ? 'Criações de tarefas'
      : pathname === '/tasks/audit-logs/update'
        ? 'Alteração de tarefas'
        : pathname === '/tasks/audit-logs/deletion'
          ? 'Exclusão de tarefas'
          : 'Selecione um tipo de ação';

  const hasFilter =
    pathname === '/tasks/audit-logs/creation' ||
    pathname === '/tasks/audit-logs/update' ||
    pathname === '/tasks/audit-logs/deletion';

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
    if (pathname === '/tasks/audit-logs') {
      navigate({ to: '/tasks/audit-logs/creation' });
    }
  }, [navigate, pathname]);

  return (
    <>
      <div className="flex h-[calc(100%-90px)] w-full flex-col gap-6 p-6">
        <h1 className="text-2xl">{textLabel}</h1>

        <Select
          value={hasFilter ? pathname : undefined}
          onValueChange={(value) => navigate({ to: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrar pelo tipo de ação" />
          </SelectTrigger>

          <SelectContent>
            {optionsTaskAuditLogFilterAction.map((option) => (
              <SelectItem
                key={option.id}
                value={option.pathname}
                className="text-muted-foreground"
              >
                {option.icon && <option.icon />}
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <TaskAuditLogProvider>
          <Outlet />
        </TaskAuditLogProvider>
      </div>
    </>
  );
}
