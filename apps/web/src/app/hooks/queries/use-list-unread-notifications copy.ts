import { useQuery } from '@tanstack/react-query';

import { makeNotificationsService } from '@/app/factories/make-notifications-service';

export function useListUnreadNotifications() {
  const notificationsService = makeNotificationsService();

  const { data, isLoading } = useQuery({
    queryKey: ['unread-notifications'],
    queryFn: () => notificationsService.listUnreadNotifications(),
  });

  return {
    unreadNotifications: data ?? [],
    isUnreadNotificationsLoading: isLoading,
  };
}
