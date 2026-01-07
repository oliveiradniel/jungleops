import { BookOpenText } from 'lucide-react';

import { EmptyData } from '@/view/components/empty-data';
import { Button } from '@/view/components/ui/button';
import { Link } from '@tanstack/react-router';

export function EmptyLog() {
  return (
    <EmptyData>
      <p className="max-w-[500px] text-center">
        Não há registro de nenhuma tarefa excluída para ser listada na auditoria
        de exclusão. Você pode excluir qualquer tarefa a partir da listagem
        principal.
      </p>

      <Button onClick={() => {}} className="p-6">
        <Link to="/tarefas" className="flex items-center gap-2">
          <BookOpenText className="size-4!" /> Ir até as tarefas
        </Link>
      </Button>
    </EmptyData>
  );
}
