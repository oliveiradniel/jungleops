import { CheckCheckIcon } from 'lucide-react';

import { Button } from '../ui/button';

import type { Notification } from '@/app/entities/notification';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { NotificationsList } from './notifications-list';

interface NotificationsListProps {
  activeNotifications: Notification[];
  inactiveNotifications: Notification[];
  readNotificationsCount: number;
  unreadNotificationsCount: number;
  typeNotifications: 'read' | 'unread';
  onToggleTypeNotification: (type: 'read' | 'unread') => void;
}

export function Notifications({
  activeNotifications,
  inactiveNotifications,
  typeNotifications,
  readNotificationsCount,
  unreadNotificationsCount,
  onToggleTypeNotification,
}: NotificationsListProps) {
  const emptyNotifications =
    activeNotifications.length === 0 && inactiveNotifications.length === 0;

  return (
    <div>
      <header className="bg-background sticky top-0 z-10 p-4 shadow-xs">
        <div className="flex h-10 items-center justify-between">
          <p className="text-sm font-semibold">Notificações</p>

          {typeNotifications === 'unread' && unreadNotificationsCount > 0 && (
            <Button variant="link" size="sm" className="text-primary text-xs">
              <CheckCheckIcon />
              Ler todas
            </Button>
          )}
        </div>

        <div className="space-x-2">
          <Button
            variant={typeNotifications === 'unread' ? 'default' : 'secondary'}
            size="sm"
            className="text-xs"
            onClick={() => onToggleTypeNotification('unread')}
          >
            Não lidas ({unreadNotificationsCount})
          </Button>

          <Button
            variant={typeNotifications === 'read' ? 'default' : 'secondary'}
            size="sm"
            className="text-xs"
            onClick={() => onToggleTypeNotification('read')}
          >
            Lidas ({readNotificationsCount})
          </Button>
        </div>
      </header>

      {activeNotifications.length === 0 &&
        inactiveNotifications.length === 0 && (
          <div className="p-4">
            <span className="text-xs">
              {typeNotifications === 'read'
                ? 'Nenhuma notificação lida para ser exibida por enquanto.'
                : 'Você está em dia. Nenhuma notificação nova por aqui'}
            </span>
          </div>
        )}

      {!emptyNotifications && (
        <Accordion
          type="single"
          collapsible
          defaultValue="active"
          className="my-4 px-4"
        >
          <AccordionItem value="active">
            <AccordionTrigger className="flex h-6 items-center">
              Ativas
            </AccordionTrigger>

            <AccordionContent>
              {activeNotifications.length > 0 ? (
                <NotificationsList notifications={activeNotifications} />
              ) : (
                <span className="pl-2 text-xs">
                  {typeNotifications === 'read'
                    ? 'Nenhuma notificação lida para ser exibida por enquanto.'
                    : 'Você está em dia. Nenhuma notificação nova por aqui'}
                </span>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="inactive">
            <AccordionTrigger className="flex h-6 items-center">
              Inativas
            </AccordionTrigger>

            <AccordionContent>
              {inactiveNotifications.length > 0 ? (
                <NotificationsList notifications={inactiveNotifications} />
              ) : (
                <span className="text-xs">
                  {typeNotifications === 'read'
                    ? 'Nenhuma notificação lida para ser exibida por enquanto.'
                    : 'Você está em dia. Nenhuma notificação nova por aqui'}
                </span>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
