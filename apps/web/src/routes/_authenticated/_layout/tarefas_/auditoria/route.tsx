import {
  createFileRoute,
  useRouter,
  Outlet,
  useLocation,
} from '@tanstack/react-router';

import { TaskAuditLogProvider } from '@/view/pages/task-audit-logs/context/task-audit-log-provider';

import { FilePen, PlusSquare, Trash2 } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/view/components/ui/select';

export const Route = createFileRoute(
  '/_authenticated/_layout/tarefas_/auditoria',
)({
  component: TaskAuditLogs,
});

export function TaskAuditLogs() {
  const { navigate } = useRouter();
  const { pathname } = useLocation();

  const textLabel =
    pathname === '/tarefas/auditoria/criacao'
      ? 'Criações de tarefas'
      : pathname === '/tarefas/auditoria/atualizacao'
        ? 'Alteração de tarefas'
        : pathname === '/tarefas/auditoria/exclusao'
          ? 'Exclusão de tarefas'
          : 'Veja os logs com informações sobre as ações realizadas nas tarefas';

  const hasFilter =
    pathname.includes('criacao') ||
    pathname.includes('atualizacao') ||
    pathname.includes('exclusao');

  const optionsTaskAuditLogFilterAction = [
    {
      id: crypto.randomUUID(),
      label: 'Criação',
      pathname: '/tarefas/auditoria/criacao',
      icon: PlusSquare,
    },
    {
      id: crypto.randomUUID(),
      label: 'Atualização',
      pathname: '/tarefas/auditoria/atualizacao',
      icon: FilePen,
    },
    {
      id: crypto.randomUUID(),
      label: 'Exclusão',
      pathname: '/tarefas/auditoria/exclusao',
      icon: Trash2,
    },
  ];

  return (
    <div className="flex h-[calc(100%-90px)] w-full flex-col gap-6 p-6">
      <h1 className="text-2xl">{textLabel}</h1>

      <Select
        value={hasFilter ? pathname : undefined}
        onValueChange={(value) => navigate({ to: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma ação" />
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
  );
}
