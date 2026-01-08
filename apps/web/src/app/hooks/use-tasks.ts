import { useContext } from 'react';

import { TasksContext } from '../contexts/tasks-context';

export function useTasks() {
  return useContext(TasksContext);
}
