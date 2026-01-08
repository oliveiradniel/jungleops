import { useQuery } from '@tanstack/react-query';

import { makeNotificationsService } from '@/app/factories/make-notifications-service';

export function useListReadNotifications() {
  const notificationsService = makeNotificationsService();

  const { data, isLoading } = useQuery({
    queryKey: ['read-notifications'],
    queryFn: () => notificationsService.listReadNotifications(),
  });

  return {
    readNotifications: data ?? [],
    isReadNotificationsLoading: isLoading,
  };
}
