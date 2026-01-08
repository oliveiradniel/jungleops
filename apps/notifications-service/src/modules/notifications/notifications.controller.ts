import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';

import { NotificationsService } from './notifications.service';

import { type Notification } from '@challenge/shared';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('read/:userId')
  listReadNotifications(
    @Param('userId') userId: string,
  ): Promise<Notification[]> {
    return this.notificationsService.listReadNotificationsByUserId(userId);
  }

  @Get('unread/:userId')
  listUnreadNotifications(
    @Param('userId') userId: string,
  ): Promise<Notification[]> {
    return this.notificationsService.listUnreadNotificationsByUserId(userId);
  }

  @Patch(':notificationId')
  read(@Param('notificationId') notificationId: string) {
    return this.notificationsService.read(notificationId);
  }

  @Patch('read-all/:userId')
  readAll(@Param('userId') userId: string) {
    return this.notificationsService.readAllNotificationsByUserId(userId);
  }

  @Delete(':notificationId')
  delete(@Param('notificationId') notificationId: string) {
    return this.notificationsService.delete(notificationId);
  }
}
