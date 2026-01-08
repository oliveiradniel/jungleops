import { useTasks } from '@/app/hooks/use-tasks';

import { cn } from '@/lib/utils';

import { Plus } from 'lucide-react';

import { EmptyData } from '@/view/components/empty-data';
import { Button } from '@/view/components/ui/button';

export function EmptyLog() {
  const { handleOpenNewTaskSheet } = useTasks();

  const textStyles = 'text-primary font-medium';

  return (
    <EmptyData>
      <p className="max-w-[500px] text-center">
        Não há registro de nenhuma tarefa criada para ser listada na auditoria
        de criação. Que tal adicionar uma agora e melhorar o seu
        <span className={cn(textStyles)}> fluxo de trabalho</span> e o seu
        <span className={cn(textStyles)}> controle de prazos</span>?
      </p>

      <Button onClick={handleOpenNewTaskSheet} className="p-6!">
        <Plus className="size-4!" /> Adicionar tarefa
      </Button>
    </EmptyData>
  );
}
