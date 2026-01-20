import { useSearch } from '@tanstack/react-router';
import { useTasksController } from './use-tasks-controller';

import { priorityLabels, statusLabels } from '@/config/labels';
import { cn } from '@/lib/utils';

import { Skeleton } from '../../components/ui/skeleton';
import { TasksCard } from './components/tasks-card';
import { Separator } from '@/view/components/ui/separator';
import { EmptyFilteredTasks } from './components/empty-filtered-tasks';
import { EmptyTasks } from './components/empty-tasks';
import { Spinner } from '@/view/components/ui/spinner';
import { PaginationControls } from '@/view/components/pagination-controls';
import { ManyFacetedTasksFilter } from '@/view/components/many-faceted-task-filters';
import { SortFilter } from './components/sort-filter';
import { TextFilter } from './components/text-filter';

export function Tasks() {
  const {
    table,
    totalAll,
    totalFiltered,
    pagination,
    facets,
    page,
    size,
    isTasksLoading,
    isTasksFetching,
    handlePageNavigation,
    handleSizePerPage,
  } = useTasksController();

  const { q } = useSearch({ from: '/_authenticated/_layout/tarefas' });

  const disabled = totalAll <= 0 || totalFiltered <= 0;

  return (
    <div
      className={cn(
        'flex',
        totalAll === 0 && !isTasksLoading && 'h-[calc(100%-90px)]',
      )}
    >
      <div className="flex h-screen w-full flex-col gap-6 p-6">
        {totalAll > 0 && (
          <>
            <header className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex flex-1 flex-wrap gap-2">
                <TextFilter
                  disabled={totalAll <= 0}
                  numberOfTasksFound={totalFiltered}
                />

                <SortFilter disabled={disabled} placeholder="Ordenar por" />

                <ManyFacetedTasksFilter
                  param="status"
                  facets={facets?.status}
                  labels={statusLabels}
                  placeholder="Status"
                  disabled={disabled}
                />

                <ManyFacetedTasksFilter
                  param="priority"
                  facets={facets?.priority}
                  labels={priorityLabels}
                  placeholder="Prioridade"
                  disabled={disabled}
                />
              </div>

              <PaginationControls
                hasPrevious={pagination?.hasPrevious ?? false}
                hasNext={pagination?.hasNext ?? false}
                totalPages={pagination?.totalPages ?? 0}
                isLoading={isTasksFetching}
                disabled={disabled}
                page={page}
                size={size}
                onPageNavigation={handlePageNavigation}
                onSizePerPage={handleSizePerPage}
              />
            </header>

            <Separator />
          </>
        )}

        {totalAll > 0 && (
          <div className="flex gap-2">
            <h1 className="flex items-baseline gap-2 text-2xl font-medium">
              Todas as tarefas
              <span className="text-muted-foreground text-sm">
                ({isTasksLoading ? '...' : totalAll})
              </span>
            </h1>

            {!isTasksLoading && isTasksFetching && (
              <Spinner className="text-primary mt-3 size-4" />
            )}
          </div>
        )}

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

        {!isTasksLoading && totalAll === 0 && <EmptyTasks />}

        {!isTasksLoading && totalAll > 0 && totalFiltered === 0 && (
          <EmptyFilteredTasks searchInput={q ?? ''} />
        )}
      </div>
    </div>
  );
}
