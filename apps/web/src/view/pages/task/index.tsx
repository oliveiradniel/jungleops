import { useTaskController } from './use-task-controller';
import { router } from '@/router';

import {
  ArrowLeft,
  CalendarClock,
  CalendarPlus,
  Pencil,
  Trash2,
} from 'lucide-react';
import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';

import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { Skeleton } from '../../components/ui/skeleton';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from '@/view/components/ui/input-group';
import { UpdateTaskSheet } from '@/view/components/update-task-sheet';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { StatusBadge } from '@/view/components/ui/status-badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/view/components/ui/tabs';
import { PaginationControls } from '@/view/components/pagination-controls';

export function Task() {
  const {
    task,
    commentsList,
    participants,
    isParticipantsLoading,
    totalCommentsCount,
    hasNext,
    hasPrevious,
    isCommentsLoading,
    isTaskLoading,
    isTasksFetching,
    currentPage,
    totalPages,
    page,
    size,
    isCreateCommentLoading,
    handleOpenUpdateTaskSheet,
    handleOpenDeleteTaskDialog,
    register,
    handleSubmitCreateComment,
    handlePageNavigation,
    handleSizePerPage,
  } = useTaskController();

  return (
    <>
      <UpdateTaskSheet key={task?.id} taskData={task} />

      <div className="px-10">
        <header className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.history.back()}
              className="text-primary-foreground"
            >
              <ArrowLeft className="size-6" />
            </Button>

            <h1 className="text-4xl break-all">
              {isTaskLoading ? 'Carregando...' : task?.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              disabled={isTaskLoading}
              onClick={handleOpenUpdateTaskSheet}
            >
              <Pencil className="size-4" />
              Editar
            </Button>

            <Button
              variant="destructive"
              disabled={isTaskLoading}
              onClick={() => handleOpenDeleteTaskDialog(task!, currentPage)}
            >
              <Trash2 className="size-4" />
              Excluir
            </Button>
          </div>
        </header>

        <Separator className="my-6" />

        <div>
          {isTaskLoading && <Skeleton className="h-30" />}

          {!isTaskLoading && <p>{task?.description}</p>}

          <div className="mt-16 flex items-center justify-between gap-4">
            <div className="flex flex-col gap-4">
              {isTaskLoading && <span>Carregando...</span>}
              {isTaskLoading && <span>Carregando...</span>}

              {!isTaskLoading && (
                <div className="flex items-center gap-2">
                  <CalendarPlus className="text-primary size-4" />
                  <span>
                    Criado em:{' '}
                    <span className="text-primary font-medium">
                      {task?.createdAt}
                    </span>
                  </span>
                </div>
              )}

              {!isTaskLoading && (
                <div className="flex items-center gap-2">
                  <CalendarClock className="text-primary size-4" />
                  <span>
                    Prazo para término:{' '}
                    <span className="text-primary font-medium">
                      {task?.term}
                    </span>
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isTaskLoading && (
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-22" />
                  <Skeleton className="h-10 w-22" />
                </div>
              )}

              {!isTaskLoading && (
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground text-xs">Status</span>

                  <StatusBadge
                    value={task?.status.value}
                    label={task?.status.label}
                  />
                </div>
              )}

              {!isTaskLoading && (
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground text-xs">
                    Prioridade
                  </span>

                  <PriorityBadge
                    value={task?.priority.value}
                    label={task?.priority.label}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <Tabs defaultValue="comments" className="mt-8">
            <TabsList>
              <TabsTrigger value="comments">Commentários</TabsTrigger>
              <TabsTrigger value="participants">Participantes</TabsTrigger>
            </TabsList>

            <TabsContent value="comments">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-3xl">
                    Comentários ({isTaskLoading ? '...' : totalCommentsCount})
                  </h2>

                  <PaginationControls
                    hasPrevious={hasPrevious ?? false}
                    hasNext={hasNext ?? false}
                    totalPages={totalPages ?? 0}
                    isLoading={isTasksFetching}
                    disabled={totalCommentsCount <= 0}
                    page={page}
                    size={size}
                    onPageNavigation={handlePageNavigation}
                    onSizePerPage={handleSizePerPage}
                  />
                </div>

                <Separator />

                {isCommentsLoading && (
                  <div className="flex flex-col gap-2">
                    {[...Array(6)].map((_, index) => (
                      <Skeleton key={index} className="h-24 w-full" />
                    ))}
                  </div>
                )}

                {!isCommentsLoading && (
                  <div className="flex flex-col gap-2">
                    {commentsList.map((comment) => {
                      const { id, comment: message, createdAt, user } = comment;

                      return (
                        <div
                          key={id}
                          className="bg-secondary flex flex-col gap-4 rounded-md p-4"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-muted-foreground">
                                Usuário:
                              </span>
                              <span>{user.username}</span>
                            </div>

                            <span className="text-xs">
                              {formatDateToBRWithHour(createdAt)}
                            </span>
                          </div>

                          <Separator />

                          <p className="text-[14px]">{message}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmitCreateComment}
                className="mt-4 w-full space-y-2 pb-8"
              >
                <InputGroup>
                  <InputGroupTextarea
                    {...register('comment')}
                    placeholder="Garantir que todos os endpoints estejam atualizados e descrevendo corretamente parâmetros, respostas, erros e..."
                    className="min-h-40"
                    required
                  />

                  <InputGroupAddon align="block-end">
                    <Button
                      type="submit"
                      disabled={isCreateCommentLoading}
                      isLoading={isCreateCommentLoading}
                    >
                      Enviar
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            </TabsContent>

            <TabsContent value="participants">
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl">
                  Participantes (
                  {isParticipantsLoading ? '...' : participants?.length})
                </h2>

                <Separator />

                <div className="flex flex-wrap gap-2">
                  {participants?.map((participant) => (
                    <div
                      key={participant.id}
                      className="bg-secondary flex flex-col rounded-md p-4"
                    >
                      <span className="text-xs">{participant.email}</span>
                      <span>{participant.username}</span>

                      <Separator className="my-2" />

                      <span className="text-sm">
                        Adicionado em: {formatDateToBR(participant.assignedAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
