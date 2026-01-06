import { createFileRoute, Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '@/view/components/ui/sidebar';

import { AppSidebar } from './-components/app-sidebar';
import { ProfilePopover } from './-components/profile-popover';
import { Notifications } from './-components/notifications';

export const Route = createFileRoute('/_authenticated/_layout')({
  component: Layout,
});

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="h-screen w-full overflow-x-hidden overflow-y-auto">
        <header className="bg-background sticky top-0 right-0 left-0 z-40 flex h-14 items-center justify-between border-b px-4">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <ProfilePopover />

            <Notifications />
          </div>
        </header>

        <Outlet />
      </main>
    </SidebarProvider>
  );
}
