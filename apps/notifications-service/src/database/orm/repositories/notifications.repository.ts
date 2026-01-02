import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationEntity } from '../entities/notification.entity';

import { INotificationsRepository } from 'src/database/contracts/notifications-repository.contract';

import {
  type CreateNotificationData,
  type Notification,
} from '@challenge/shared';

@Injectable()
export class NotificationsRepository implements INotificationsRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationsRepository: Repository<NotificationEntity>,
  ) {}

  getById(id: string): Promise<Notification | null> {
    return this.notificationsRepository.findOne({ where: { id } });
  }

  listReadNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: {
        userId,
        read: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  listUnreadNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: {
        userId,
        read: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  create(data: CreateNotificationData): Promise<Notification> {
    const { userId, kind, metadata } = data;

    const notification = this.notificationsRepository.create({
      userId,
      kind,
      metadata,
    });

    return this.notificationsRepository.save(notification);
  }

  async read(id: string): Promise<void> {
    await this.notificationsRepository.update(id, {
      read: true,
    });
  }

  async delete(id: string): Promise<void> {
    await this.notificationsRepository.delete(id);
  }
}
