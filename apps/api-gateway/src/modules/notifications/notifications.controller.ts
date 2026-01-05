import { Controller, Delete, Get, Param, Patch, Req } from '@nestjs/common';

import { Request } from 'express';

import { NotificationsService } from './notifications.service';

import { NotificationIdParam } from './params/notification-id.param';

import { Notification } from '@challenge/shared';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('read')
  listReadNotificationsByUserId(
    @Req() request: Request,
  ): Promise<Notification[]> {
    const userId = request.user?.userId;

    return this.notificationsService.listReadNotificationsByUserId(userId!);
  }

  @Get('unread')
  listUnreadNotificationsByUserId(
    @Req() request: Request,
  ): Promise<Notification[]> {
    const userId = request.user?.userId;

    return this.notificationsService.listUnreadNotificationsByUserId(userId!);
  }

  @Patch('read-all')
  readAll(@Req() request: Request): Promise<void> {
    const userId = request.user?.userId;

    return this.notificationsService.readAllNotificationsByUserId(userId!);
  }

  @Patch(':notificationId')
  read(@Param() params: NotificationIdParam): Promise<void> {
    const { notificationId } = params;

    return this.notificationsService.read(notificationId);
  }

  @Delete(':notificationId')
  delete(@Param() params: NotificationIdParam): Promise<void> {
    const { notificationId } = params;

    return this.notificationsService.delete(notificationId);
  }
}
