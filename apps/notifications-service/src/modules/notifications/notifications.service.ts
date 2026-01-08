import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { INotificationsRepository } from 'src/database/contracts/notifications-repository.contract';

import { NOTIFICATIONS_REPOSITORY } from 'src/shared/constants/tokens';

import {
  type CreateNotificationData,
  type Notification,
} from '@challenge/shared';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATIONS_REPOSITORY)
    private readonly notificationsRepository: INotificationsRepository,
  ) {}

  listReadNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.listReadNotificationsByUserId(userId);
  }

  listUnreadNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.listUnreadNotificationsByUserId(userId);
  }

  create(data: CreateNotificationData): Promise<Notification> {
    const { userId, kind, metadata } = data;

    return this.notificationsRepository.create({
      userId,
      kind,
      metadata,
    });
  }

  async read(id: string): Promise<void> {
    await this.verifyNotificationExists(id);

    await this.notificationsRepository.read(id);
  }

  async readAllNotificationsByUserId(userId: string): Promise<void> {
    await this.notificationsRepository.readAllNotificationsByUserId(userId);
  }

  async delete(id: string): Promise<void> {
    await this.verifyNotificationExists(id);

    await this.notificationsRepository.delete(id);
  }

  async verifyNotificationExists(id: string) {
    const notification = await this.notificationsRepository.getById(id);
    if (!notification) {
      throw new NotFoundException('Notification not found.');
    }

    return notification;
  }
}
