import { Controller, Delete, Get, Param, Patch, Req } from '@nestjs/common';

import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Request } from 'express';

import { NotificationsService } from './notifications.service';

import { NotificationIdParam } from './params/notification-id.param';
import { ListNotificationsOkResponse } from './responses/list-notifications-ok.response';
import { BadGatewayResponse } from 'src/shared/responses/bad-gateway.responde';
import { UnauthorizedResponse } from 'src/shared/responses/unauthorized.response';
import { ThrottlerResponse } from 'src/shared/responses/throttler.response';
import { NotFoundNotificationResponse } from './responses/not-found-notification.response';

import { Notification } from '@challenge/shared';

@ApiBearerAuth()
@ApiBadGatewayResponse({
  description:
    'The gateway received an invalid response or no response from a microservice.',
  type: BadGatewayResponse,
})
@ApiUnauthorizedResponse({
  description: 'Invalid token or missing token.',
  type: UnauthorizedResponse,
})
@ApiResponse({
  status: 429,
  description:
    'Too many requests. The client has exceeded the rate limit of 10 requests per second.',
  type: ThrottlerResponse,
})
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOkResponse({
    description: 'Lists all read notifications.',
    type: ListNotificationsOkResponse,
  })
  @Get('read')
  listReadNotificationsByUserId(
    @Req() request: Request,
  ): Promise<Notification[]> {
    const userId = request.user?.userId;

    return this.notificationsService.listReadNotificationsByUserId(userId!);
  }

  @ApiOkResponse({
    description: 'Lists all unread notifications.',
    type: ListNotificationsOkResponse,
  })
  @Get('unread')
  listUnreadNotificationsByUserId(
    @Req() request: Request,
  ): Promise<Notification[]> {
    const userId = request.user?.userId;

    return this.notificationsService.listUnreadNotificationsByUserId(userId!);
  }

  @ApiNoContentResponse({
    description: 'Notifications handled successfully. No content is returned.',
  })
  @Patch('read-all')
  readAll(@Req() request: Request): Promise<void> {
    const userId = request.user?.userId;

    return this.notificationsService.readAllNotificationsByUserId(userId!);
  }

  @ApiNoContentResponse({
    description: 'Notification handled successfully. No content is returned.',
  })
  @ApiNotFoundResponse({
    description: 'No notification found with the provided ID.',
    type: NotFoundNotificationResponse,
  })
  @Patch(':notificationId')
  read(@Param() params: NotificationIdParam): Promise<void> {
    const { notificationId } = params;

    return this.notificationsService.read(notificationId);
  }

  @ApiNoContentResponse({
    description: 'Notification successfully deleted. No content is returned.',
  })
  @ApiNotFoundResponse({
    description: 'No notification found with the provided ID.',
    type: NotFoundNotificationResponse,
  })
  @Delete(':notificationId')
  delete(@Param() params: NotificationIdParam): Promise<void> {
    const { notificationId } = params;

    return this.notificationsService.delete(notificationId);
  }
}
