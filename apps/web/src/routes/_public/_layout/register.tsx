import { createFileRoute } from '@tanstack/react-router';

import { Register } from '@/view/pages/register';

export const Route = createFileRoute('/_public/_layout/register')({
  staticData: {
    lead: 'Pronto(a) para entrar na selva?',
    description: 'Cadastre-se e desbloqueie seu território de operações.',
    calloutText:
      'Gerencie suas tarefas, acompanhe prazos, envolva sua equipe e mantenha o fluxo de trabalho sob controle com o JungleOps.',
    authPrompt: 'Já tem uma conta?',
    authLinkLabel: 'Entrar aqui',
    href: '/login',
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Register />;
}
