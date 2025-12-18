import { useDeleteTaskDialog } from './use-delete-task-dialog';

import { truncateString } from '@/app/utils/truncate-string';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

import type { Task } from '@/app/entities/task';

interface DeleteTaskDialogProps {
  task: Pick<Task, 'id' | 'title' | 'status' | 'createdAt'>;
  page: number;
  onClosePopover?: () => void;
}

export function DeleteTaskDialog({
  task,
  page,
  onClosePopover,
}: DeleteTaskDialogProps) {
  const {
    isDeleteTaskDialogOpen,
    isDeleteTaskLoading,
    buttonDeleteTaskDisabled,
    titleConfirmation,
    handleCloseDeleteTaskDialog,
    handleChangeTitleConfirmation,
    handleDeleteTask,
  } = useDeleteTaskDialog({
    taskId: task?.id,
    title: task?.title,
    page,
    onClosePopover,
  });

  return (
    <Dialog
      open={isDeleteTaskDialogOpen}
      onOpenChange={handleCloseDeleteTaskDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Tem certeza que deseja excluir esta tarefa?
          </DialogTitle>
          <DialogDescription>
            Essa ação não poderá ser desfeita, todos os comentários relacionados
            também serão excluídos.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col">
          <div>
            <span className="text-muted-foreground">Título:</span>{' '}
            <span className="text-sm">{truncateString(task.title, 40)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span>{' '}
            <span className="text-sm">{task.status?.label}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Criado em:</span>{' '}
            <span className="text-sm">{task.createdAt}</span>
          </div>
        </div>

        <Separator />

        <DialogFooter>
          <form onSubmit={handleDeleteTask} className="w-full space-y-2">
            <Label htmlFor="task-name-for-delete">
              Digite o título da tarefa para continuar.
            </Label>
            <Input
              aria-invalid="true"
              id="task-name-for-delete"
              placeholder={truncateString(task.title, 40)}
              value={titleConfirmation}
              onChange={handleChangeTitleConfirmation}
            />

            <div className="space-y-2">
              <Button
                type="submit"
                variant="destructive"
                disabled={buttonDeleteTaskDisabled || isDeleteTaskLoading}
                isLoading={isDeleteTaskLoading}
                className="w-full"
              >
                Confirmar
              </Button>

              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={isDeleteTaskLoading}
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
  );
}
