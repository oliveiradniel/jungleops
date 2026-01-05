import { useMutation } from '@tanstack/react-query';

import { makeNotificationsService } from '@/app/factories/make-notifications-service';

export function useReadAllNotifications() {
  const notificationsService = makeNotificationsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => notificationsService.readAllNotifications(),
  });

  return {
    readAllNotifications: mutateAsync,
    isReadAllNotificationsLoading: isPending,
  };
}
