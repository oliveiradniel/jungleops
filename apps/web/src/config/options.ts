import { TaskPriority, TaskStatus } from '@challenge/shared';

interface OptionsTaskPriority {
  id: string;
  value: TaskPriority;
  label: string;
}

interface OptionsTaskStatus {
  id: string;
  value: TaskStatus;
  label: string;
}

const optionsTaskPriority: OptionsTaskPriority[] = [
  {
    id: crypto.randomUUID(),
    value: TaskPriority.LOW,
    label: 'Baixa',
  },
  {
    id: crypto.randomUUID(),
    value: TaskPriority.MEDIUM,
    label: 'Média',
  },
  {
    id: crypto.randomUUID(),
    value: TaskPriority.HIGH,
    label: 'Alta',
  },
  {
    id: crypto.randomUUID(),
    value: TaskPriority.URGENT,
    label: 'Urgente',
  },
];

const optionsTaskStatus: OptionsTaskStatus[] = [
  {
    id: crypto.randomUUID(),
    value: TaskStatus.TODO,
    label: 'Pendente',
  },
  {
    id: crypto.randomUUID(),
    value: TaskStatus.IN_PROGRESS,
    label: 'Em progresso',
  },
  {
    id: crypto.randomUUID(),
    value: TaskStatus.REVIEW,
    label: 'Em revisão',
  },
  {
    id: crypto.randomUUID(),
    value: TaskStatus.DONE,
    label: 'Concluída',
  },
];

export { optionsTaskPriority, optionsTaskStatus };
