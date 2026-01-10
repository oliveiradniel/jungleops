import { Link, useLocation } from '@tanstack/react-router';

import { useTasks } from '@/app/hooks/use-tasks';
import { useAuth } from '@/app/hooks/use-auth';

import { BookOpenText, History, Plus } from 'lucide-react';
import jungleOpsLogo from '@/assets/images/logo.svg';

import { cn } from '@/lib/utils';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/view/components/ui/sidebar';
import { Button } from '@/view/components/ui/button';

export function AppSidebar() {
  const location = useLocation();

  const { isLogoutLoading } = useAuth();
  const { handleOpenNewTaskSheet } = useTasks();

  const items = [
    {
      title: 'Tarefas',
      url: '/tarefas',
      icon: BookOpenText,
      matchRoutes: ['/tarefas'],
    },
    {
      title: 'Registro de auditoria',
      url: '/tarefas/auditoria/criacao',
      icon: History,
      matchRoutes: [
        '/tarefas/auditoria/criacao',
        '/tarefas/auditoria/atualizacao',
        '/tarefas/auditoria/exclusao',
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <img src={jungleOpsLogo} alt="" className="size-8" />
          <span className="text-card-foreground text-lg font-medium">
            JungleOps
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="p-2">
          {items.map((item) => {
            const isActive = item.matchRoutes.includes(location.pathname);
            const isChildrenTaskAuditLogsActive =
              location.pathname.startsWith('/tarefas/auditoria');

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    isActive ||
                    (item.url === '/tarefas/auditoria' &&
                      isChildrenTaskAuditLogsActive)
                  }
                  className="transition-all"
                >
                  <Link
                    to={item.url}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md px-3 py-6 transition-all',
                      !isActive && 'hover:bg-primary/20!',
                      isActive && 'cursor-default',
                    )}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <Button
          disabled={isLogoutLoading}
          onClick={handleOpenNewTaskSheet}
          className="justify-start py-6 transition-all"
        >
          <Plus className="size-4!" /> Adicionar tarefa
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
