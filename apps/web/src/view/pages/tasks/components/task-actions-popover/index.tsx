import { useTaskActionsPopoverController } from './use-task-actions-popover-controller';
import { Link } from '@tanstack/react-router';

import { Info, MessageSquare, MoreHorizontal, Trash2 } from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/view/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';
import { Textarea } from '@/view/components/ui/textarea';

import type { TaskStatus } from '@challenge/shared';

interface TaskActionsPopover {
  taskId: string;
  title: string;
  status: {
    value: TaskStatus;
    label: string;
  };
  createdAt: string;
}

export function TaskActionsPopover({
  taskId,
  title,
  status,
  createdAt,
}: TaskActionsPopover) {
  const {
    isPopoverOpen,
    isNewCommentDialogOpen,
    comment,
    currentPage,
    setIsPopoverOpen,
    setIsNewCommentDialogOpen,
    setComment,
    handleCreateComment,
    handleOpenDeleteTaskDialog,
    isCreateCommentLoading,
  } = useTaskActionsPopoverController({ title, taskId });

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="m-0 p-0">
          <MoreHorizontal className="size-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <Link
            to={'/tarefas/$taskId'}
            params={{ taskId }}
            className="focus-visible:border-ring bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border-input focus-visible:ring-ring/50 flex w-full items-center justify-start gap-4 rounded-md border px-3 py-2 text-sm font-normal shadow-xs transition-all outline-none focus-visible:ring-[3px]"
          >
            <Info className="text-muted-foreground size-5" />
            Ver mais informações
          </Link>

          <Dialog
            open={isNewCommentDialogOpen}
            onOpenChange={setIsNewCommentDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start gap-4 font-normal"
              >
                <MessageSquare className="size-5" />
                Adicionar comentário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar comentário</DialogTitle>
                <DialogDescription>
                  Comunique-se com os envolvidos, melhore a colaboração e
                  registre comentários importantes para a tarefa.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <form
                  onSubmit={handleCreateComment}
                  className="w-full space-y-2"
                >
                  <Textarea
                    placeholder="Garantir que todos os endpoints estejam atualizados e descrevendo corretamente parâmetros, respostas, erros e..."
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />

                  <div className="space-y-2">
                    <Button
                      type="submit"
                      disabled={isCreateCommentLoading}
                      isLoading={isCreateCommentLoading}
                      className="w-full"
                    >
                      Enviar
                    </Button>

                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        disabled={isCreateCommentLoading}
                        className="w-full"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                  </div>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="destructive"
            onClick={() =>
              handleOpenDeleteTaskDialog(
                { id: taskId, title, status, createdAt },
                currentPage,
              )
            }
            className="text-primary-foreground w-full justify-start gap-4 font-normal"
          >
            <Trash2 className="size-5" />
            Excluir tarefa
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
