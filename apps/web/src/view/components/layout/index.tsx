import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';

import { AppSidebar } from './app-sidebar';
import { NotificationsPopover } from '../notifications/notifications-popover';
import { ProfilePopover } from '../profile-popover';
import { NotificationProvider } from '../notifications/notification-provider';

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="h-screen w-full overflow-x-hidden overflow-y-auto">
        <header className="bg-background sticky top-0 right-0 left-0 z-40 flex h-14 items-center justify-between border-b px-4">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <ProfilePopover />

            <NotificationProvider>
              <NotificationsPopover />
            </NotificationProvider>
          </div>
        </header>

        <Outlet />
      </main>
    </SidebarProvider>
  );
}
