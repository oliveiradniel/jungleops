import { useAuth } from '@/app/hooks/use-auth';

import pageNotFound from '@/assets/images/page-not-found.svg';

import { Button } from '@/view/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Separator } from '@/view/components/ui/separator';

export function NotFound() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="text-muted-foreground text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Página não encontrada
        </span>

        <img src={pageNotFound} alt="" />

        <Separator />

        <div className="flex flex-col items-center gap-4">
          <span className="text-muted-foreground">Tente essas:</span>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link to="/tasks" replace>
                  Tarefas
                </Link>
              </Button>
              {/* <Button>Minhas tarefas</Button> */}
              <Button asChild>
                <Link to="/tasks/audit-logs/creation" replace>
                  Histórico de alterações
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link to="/login" search={{ redirect: '/tasks' }} replace>
                  Fazer login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register" search={{ redirect: '/tasks' }} replace>
                  Criar conta
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
