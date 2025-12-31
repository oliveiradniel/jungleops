import { useQuery } from '@tanstack/react-query';

import { makeNotificationsService } from '@/app/factories/make-notifications-service';

export function useListReadNotifications({
  enabled = true,
}: {
  enabled?: boolean;
}) {
  const notificationsService = makeNotificationsService();

  const { data, isLoading } = useQuery({
    queryKey: ['read-notifications'],
    queryFn: () => notificationsService.listReadNotifications(),
    enabled,
  });

  return {
    readNotifications: data ?? [],
    isReadNotificationsLoading: isLoading,
  };
}
