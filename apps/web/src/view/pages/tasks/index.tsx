import { useTasksController } from './use-tasks-controller';

import { priorityLabels, statusLabels } from '@/config/labels';

import { Skeleton } from '../../components/ui/skeleton';
import { TasksCard } from './components/tasks-card';
import { Separator } from '@/view/components/ui/separator';
import { EmptyFilteredTasks } from './components/empty-filtered-tasks';
import { EmptyTasks } from './components/empty-tasks';
import { Spinner } from '@/view/components/ui/spinner';
import { Header } from '@/view/components/header';
import { PaginationControls } from './components/pagination-controls';
import { Filters } from './components/filters';
import { DataTableTextFilter } from '@/view/components/data-table/data-table-text-filter';
import { DataTableFacetedFilter } from '@/view/components/data-table/data-table-faceted-filter';

export function Tasks() {
  const {
    table,
    startPage,
    pagesToShow,
    page,
    endPage,
    hasPrevious,
    hasNext,
    totalPages,
    isTasksLoading,
    isTasksPending,
    totalTasksCount,
    filteredTasksList,
    searchInput,
    goToPage,
    handlePreviousTasksPage,
    handleNextTasksPage,
    handleChangeSearchInput,
  } = useTasksController();

  return (
    <>
      <div className="flex h-[calc(100%-90px)]">
        <div className="flex h-full w-full flex-col gap-6 p-6">
          <Header
            searchInput={searchInput}
            placeholderInput="Digite o título de uma tarefa"
            itemsList={filteredTasksList}
            isLoading={isTasksLoading}
            itemsCount={totalTasksCount}
            handleChangeSearchInput={handleChangeSearchInput}
          >
            <PaginationControls
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              startPage={startPage}
              pagesToShow={pagesToShow}
              endPage={endPage}
              totalPages={totalPages}
              currentPage={page}
              itemsCount={totalTasksCount}
              goToPage={goToPage}
              isDisabled={isTasksLoading}
              handlePreviousTasksPage={handlePreviousTasksPage}
              handleNextTasksPage={handleNextTasksPage}
            >
              <Filters disabled={isTasksLoading || totalTasksCount === 0} />
            </PaginationControls>
          </Header>

          <header className="flex flex-col items-start justify-between gap-2 xl:flex-row">
            <DataTableTextFilter
              table={table}
              placeholder="Digite o título de uma tarefa"
              column="title"
            />

            <DataTableFacetedFilter
              table={table}
              column="status"
              labels={statusLabels}
              placeholder="Status"
            />

            <DataTableFacetedFilter
              table={table}
              column="priority"
              labels={priorityLabels}
              placeholder="Prioridade"
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
            filteredTasksList.length === 0 &&
            totalTasksCount > 0 && (
              <EmptyFilteredTasks searchInput={searchInput} />
            )}
        </div>
      </div>
    </>
  );
}
