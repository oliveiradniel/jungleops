import {
  useDeleteLogDialog,
  type DeleteLogDialogProps,
} from './use-delete-log-dialog';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/view/components/ui/dialog';
import { Separator } from '@/view/components/ui/separator';
import { Button } from '@/view/components/ui/button';

export function DeleteLogDialog({ selectedLogId, type }: DeleteLogDialogProps) {
  const {
    handleDeleteLog,
    handleCloseDeleteTaskAuditLogDialog,
    isDeleteTaskAuditLogLoading,
    isDeleteTaskAuditLogDialogOpen,
  } = useDeleteLogDialog({
    selectedLogId,
    type,
  });

  return (
    <Dialog
      open={isDeleteTaskAuditLogDialogOpen}
      onOpenChange={handleCloseDeleteTaskAuditLogDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Tem certeza que deseja excluir este audit log?
          </DialogTitle>
          <DialogDescription>
            Essa ação não poderá ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            disabled={isDeleteTaskAuditLogLoading}
            isLoading={isDeleteTaskAuditLogLoading}
            onClick={() => handleDeleteLog()}
            className="flex-1"
          >
            Confirmar
          </Button>

          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isDeleteTaskAuditLogLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
