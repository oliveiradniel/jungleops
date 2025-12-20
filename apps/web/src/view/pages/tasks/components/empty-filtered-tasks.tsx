import filteredTasksNotFoundImage from '@/assets/images/filtered-tasks-not-found.svg';

interface EmptyFilteredTasksProps {
  searchInput: string;
}

export function EmptyFilteredTasks({ searchInput }: EmptyFilteredTasksProps) {
  return (
    <div className="animate-fade-in flex h-full flex-col items-center justify-center gap-6">
      <img src={filteredTasksNotFoundImage} alt="" className="h-60" />

      <div className="flex flex-col gap-4">
        <span>Não foi possível encontrar nenhuma tarefa com:</span>

        <div>
          <span className="text-sm">
            O título:{' '}
            <span className="text-primary font-medium">"{searchInput}"</span>
          </span>
        </div>
      </div>
    </div>
  );
}
