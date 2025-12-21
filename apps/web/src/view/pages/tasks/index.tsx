import { useTasksController } from './use-tasks-controller';

import { priorityLabels, statusLabels } from '@/config/labels';

import { Skeleton } from '../../components/ui/skeleton';
import { TasksCard } from './components/tasks-card';
import { Separator } from '@/view/components/ui/separator';
import { EmptyFilteredTasks } from './components/empty-filtered-tasks';
import { EmptyTasks } from './components/empty-tasks';
import { Spinner } from '@/view/components/ui/spinner';
import { DataTableTextFilter } from '@/view/components/data-table/data-table-text-filter';
import { DataTableManyFacetedFilter } from '@/view/components/data-table/data-table-many-faceted-filter';
import { PaginationControls } from '@/view/components/pagination-controls';

export function Tasks() {
  const {
    table,
    totalTasksCount,
    isTasksLoading,
    isTasksPending,
    hasPrevious,
    hasNext,
    totalPages,
  } = useTasksController();

  return (
    <>
      <div className="flex h-[calc(100%-90px)]">
        <div className="flex h-full w-full flex-col gap-6 p-6">
          <header className="flex flex-col items-start justify-between gap-2">
            <div className="flex w-full items-start gap-2">
              <DataTableTextFilter
                table={table}
                placeholder="Digite o título de uma tarefa"
                column="title"
              />

              <DataTableManyFacetedFilter
                table={table}
                column="status"
                labels={statusLabels}
                placeholder="Status"
              />

              <DataTableManyFacetedFilter
                table={table}
                column="priority"
                labels={priorityLabels}
                placeholder="Prioridade"
              />
            </div>

            <PaginationControls
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              totalPages={totalPages}
              isLoading={isTasksPending}
            />
          </header>

          <Separator />

          <div className="flex items-center gap-4">
            <h1 className="flex items-baseline gap-2 text-2xl font-medium">
              Todas as tarefas
              {isTasksLoading ? (
                <span className="text-muted-foreground text-[16px]">...</span>
              ) : (
                !isTasksPending && (
                  <span className="text-muted-foreground text-[16px]">
                    ({totalTasksCount ?? 0})
                  </span>
                )
              )}
            </h1>

            {!isTasksLoading && isTasksPending && (
              <Spinner className="text-primary size-6" />
            )}
          </div>

          {isTasksLoading && isTasksPending && (
            <div className="flex flex-wrap gap-2">
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  key={`task-${index}`}
                  className="h-[200px] w-full max-w-[300px] rounded-xl"
                />
              ))}
            </div>
          )}

          {!isTasksLoading && table.getRowCount() > 0 && (
            <TasksCard table={table} />
          )}

          {!isTasksLoading && totalTasksCount === 0 && <EmptyTasks />}

          {!isTasksLoading &&
            table.getRowCount() === 0 &&
            totalTasksCount > 0 && (
              <EmptyFilteredTasks
                searchInput={
                  table.getColumn('title')?.getFilterValue() as string
                }
              />
            )}
        </div>
      </div>
    </>
  );
}
