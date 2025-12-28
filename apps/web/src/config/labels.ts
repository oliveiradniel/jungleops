import type { FieldName, TaskPriority, TaskStatus } from '@challenge/shared';

export const priorityLabels: Record<TaskPriority, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  URGENT: 'Urgente',
};

export const statusLabels: Record<TaskStatus, string> = {
  TODO: 'Pendente',
  IN_PROGRESS: 'Em progresso',
  REVIEW: 'Em revisão',
  DONE: 'Concluída',
};

export const fieldLabels: Record<FieldName, string> = {
  title: 'Título',
  description: 'Descrição',
  term: 'Prazo',
  priority: 'Prioridade',
  status: 'Status',
  userIds: 'Participantes',
};
