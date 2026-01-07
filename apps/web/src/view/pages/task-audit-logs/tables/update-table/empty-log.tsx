import { Link } from '@tanstack/react-router';

import { cn } from '@/lib/utils';

import { BookOpenText } from 'lucide-react';

import { EmptyData } from '@/view/components/empty-data';
import { Button } from '@/view/components/ui/button';

export function EmptyLog() {
  const textStyles = 'text-primary font-medium';

  return (
    <EmptyData>
      <p className="max-w-[500px] text-center">
        Ainda não há registro de nenhuma tarefa atualizada para ser listada na
        auditoria de atualização. Você pode atualizar o
        <span className={cn(textStyles)}> título</span>,
        <span className={cn(textStyles)}> descrição</span>,
        <span className={cn(textStyles)}> prazo</span>,
        <span className={cn(textStyles)}> prioridade</span>,
        <span className={cn(textStyles)}> status</span> e até adicionar
        <span className={cn(textStyles)}> novos usuários</span> à tarefa.
      </p>

      <Button onClick={() => {}} className="p-6">
        <Link to="/tarefas" className="flex items-center gap-2">
          <BookOpenText className="size-4!" /> Ir até as tarefas
        </Link>
      </Button>
    </EmptyData>
  );
}
