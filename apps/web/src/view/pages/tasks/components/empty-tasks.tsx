import { useTasks } from '@/app/hooks/use-tasks';

import { Plus } from 'lucide-react';
import tasksNotFoundImage from '@/assets/images/tasks-not-found.svg';

import { Button } from '@/view/components/ui/button';

export function EmptyTasks() {
  const { handleOpenNewTaskSheet } = useTasks();

  return (
    <div className="animate-fade-in flex h-full flex-col items-center justify-center gap-6">
      <img src={tasksNotFoundImage} alt="" className="h-60" />

      <p className="max-w-[500px] text-center">
        Não há nenhuma tarefa disponível. Que tal adicionar uma agora e melhorar
        o seu{' '}
        <span className="text-primary font-medium">fluxo de trabalho</span> e{' '}
        <span className="text-primary font-medium">controle de prazos</span>?
      </p>

      <Button onClick={handleOpenNewTaskSheet} className="p-6!">
        <Plus className="size-4!" /> Adicionar tarefa
      </Button>
    </div>
  );
}
