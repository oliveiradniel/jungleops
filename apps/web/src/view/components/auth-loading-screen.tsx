import jungleGamingLogo from '../../assets/images/logo.svg';

import type { LoadingType } from '@/app/contexts/auth-context';

export function AuthLoadingScreen({
  loadingType,
}: {
  loadingType: LoadingType;
}) {
  return (
    <div className="animate-fade-in flex h-screen w-screen flex-col items-center justify-center gap-4">
      <img src={jungleGamingLogo} alt="" className="h-30 w-30" />

      <p className="text-muted-foreground">
        {loadingType === 'is-session' && 'Sincronizando acesso...'}
        {loadingType === 'is-login/is-register' && 'Configurando sua conta...'}
        {loadingType === 'is-logout' && 'Saindo...'}
      </p>

      <div className="border-primary h-10 w-10 animate-spin rounded-full border-l-3" />
    </div>
  );
}
