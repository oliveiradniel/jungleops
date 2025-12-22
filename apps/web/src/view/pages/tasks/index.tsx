import { useTasksController } from './use-tasks-controller';

import { priorityLabels, statusLabels } from '@/config/labels';

import { Skeleton } from '../../components/ui/skeleton';
import { TasksCard } from './components/tasks-card';
import { Separator } from '@/view/components/ui/separator';
import { EmptyFilteredTasks } from './components/empty-filtered-tasks';
import { EmptyTasks } from './components/empty-tasks';
import { Spinner } from '@/view/components/ui/spinner';
import { DataTableTextFilter } from '@/view/components/data-table/data-table-text-filter';
import { PaginationControls } from '@/view/components/pagination-controls';
import { ManyFacetedTasksFilter } from '@/view/components/many-faceted-task-filters';
import { SortFilter } from './components/sort-filter';

export function Tasks() {
  const { table, total, pagination, facets, isTasksLoading, isTasksFetching } =
    useTasksController();

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

              <SortFilter placeholder="Ordenar por" />

              <ManyFacetedTasksFilter
                param="status"
                facets={facets?.status}
                labels={statusLabels}
                placeholder="Status"
              />

              <ManyFacetedTasksFilter
                param="priority"
                facets={facets?.priority}
                labels={priorityLabels}
                placeholder="Prioridade"
              />
            </div>

            <PaginationControls
              hasPrevious={pagination?.hasPrevious ?? false}
              hasNext={pagination?.hasNext ?? false}
              totalPages={pagination?.totalPages ?? 0}
              isLoading={isTasksFetching}
            />
          </header>

          <Separator />

          <div className="flex gap-2">
            <h1 className="flex items-baseline gap-2 text-2xl font-medium">
              Todas as tarefas
              {isTasksLoading ? (
                <span className="text-muted-foreground text-[16px]">...</span>
              ) : (
                !isTasksFetching && (
                  <span className="text-muted-foreground text-[16px]">
                    ({total ?? 0})
                  </span>
                )
              )}
            </h1>

            {!isTasksLoading && isTasksFetching && (
              <Spinner className="text-primary mt-3 size-4" />
            )}
          </div>

          {isTasksLoading && isTasksFetching && (
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

          {!isTasksLoading && total === 0 && <EmptyTasks />}

          {!isTasksLoading && table.getRowCount() === 0 && total > 0 && (
            <EmptyFilteredTasks
              searchInput={table.getColumn('title')?.getFilterValue() as string}
            />
          )}
        </div>
      </div>
    </>
  );
}
