import { useAuth } from '@/app/hooks/use-auth';

import { Calendar, LogOut, User } from 'lucide-react';

import { formatDateToBR } from '@/app/utils/format-date-br';

import { Button } from '@/view/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';
import { Separator } from '@/view/components/ui/separator';

export function ProfilePopover() {
  const { user, handleLogout, isLogoutLoading } = useAuth();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="ghost"
          disabled={isLogoutLoading}
          className="justify-start gap-4 py-6"
        >
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
            <span className="font-normal">
              {user?.username[0].toUpperCase()}
            </span>
          </div>

          <span className="font-normal">{user?.username}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end">
        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center gap-1">
            <User className="size-4" />
            <span className="text-sm">{user?.email}</span>
          </div>

          <div className="text-muted-foreground flex items-center gap-1">
            <Calendar className="size-4" />
            <span className="flex items-center gap-2 text-sm">
              Usuário desde: {formatDateToBR(user?.createdAt!)}
            </span>
          </div>

          <Separator />

          <Button
            variant="ghost"
            isLoading={isLogoutLoading}
            disabled={isLogoutLoading}
            onClick={() => handleLogout()}
            className="text-destructive! w-full justify-start"
          >
            <LogOut /> Sair
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
