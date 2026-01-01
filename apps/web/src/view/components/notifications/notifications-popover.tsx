import { BellIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Notifications } from './notifications';
import { useNotifications } from './use-notification';

export function NotificationsPopover() {
  const { notificationsCount } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-primary relative flex size-8 items-center justify-center rounded-full">
          {notificationsCount > 0 && (
            <div className="bg-destructive absolute top-0 right-0 flex size-5 translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full text-[10px]">
              {notificationsCount > 9 ? '9+' : notificationsCount}
            </div>
          )}

          <BellIcon className="text-primary-foreground size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="bg-background max-h-[70vh] w-[400px] overflow-y-auto p-0"
      >
        <Notifications />
      </PopoverContent>
    </Popover>
  );
}
