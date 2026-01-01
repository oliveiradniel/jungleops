import { useMutation } from '@tanstack/react-query';

import { makeNotificationsService } from '@/app/factories/make-notifications-service';

export function useReadNotification() {
  const notificationsService = makeNotificationsService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (notificationId: string) =>
      notificationsService.read(notificationId),
  });

  return {
    readNotification: mutateAsync,
    isReadNotificationLoading: isPending,
  };
}
