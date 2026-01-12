import { createFileRoute } from '@tanstack/react-router';

import { Login } from '@/view/pages/login';

export const Route = createFileRoute('/_public/_layout/login')({
  staticData: {
    lead: 'Bem vindo(a) à selva de operações!',
    description: 'Preparado(a) para dominar suas tarefas?',
    calloutText:
      'Pronto para continuar avançando? Retorne ao JungleOps e continue gerenciando tarefas, prazos e equipes com eficiência.',
    authPrompt: 'Ainda não tem uma conta?',
    authLinkLabel: 'Criar conta',
    href: '/cadastro',
  },
  head: () => ({
    meta: [
      {
        title: 'Entrar - JungleOps',
      },
      {
        name: 'description',
        content:
          'Pronto para continuar avançando? Retorne ao JungleOps e continue gerenciando tarefas, prazos e equipes com eficiência.',
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
