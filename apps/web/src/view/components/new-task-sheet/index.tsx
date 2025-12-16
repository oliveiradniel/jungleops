import { useNewTaskSheetController } from './use-new-task-sheet-controller';

import { Controller } from 'react-hook-form';

import { SheetTemplate } from '../sheet-template';
import { FormGroup } from '../ui/form-group';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { DatePicker } from '../ui/date-picker';
import { TaskRadioGroup } from '../task-radio-group';

import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';

export function NewTaskSheet() {
  const {
    control,
    register,
    handleSubmit,
    optionsTaskPriority,
    optionsTaskStatus,
    titleErrorMessage,
    descriptionErrorMessage,
    termErrorMessage,
    priorityErrorMessage,
    statusErrorMessage,
    isFormInvalid,
    isNewTaskSheetOpen,
    isCreateTaskLoading,
    handleCloseNewTaskSheet,
  } = useNewTaskSheetController();

  return (
    <SheetTemplate
      isOpen={isNewTaskSheetOpen}
      title="Cadastrar tarefa"
      description="Inclua uma nova demanda no fluxo de trabalho e facilite a
      comunicação entre os membros da equipe."
      isSubmitting={isCreateTaskLoading}
      isFormInvalid={isFormInvalid}
      onClose={handleCloseNewTaskSheet}
      buttonLabel="Criar"
    >
      <form
        id="new-task-form"
        onSubmit={handleSubmit}
        className="scrollbar-custom max-w-full space-y-4 overflow-y-auto p-4"
      >
        <FormGroup error={titleErrorMessage}>
          <Label htmlFor="title">Qual o título da tarefa?</Label>
          <Input
            aria-invalid={!!titleErrorMessage}
            id="title"
            placeholder="Desenvolver API, Autenticar usuário, etc..."
            {...register('title')}
            required
          />
        </FormGroup>

        <FormGroup error={descriptionErrorMessage}>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            aria-invalid={!!descriptionErrorMessage}
            placeholder="Garantir que todos os endpoints estejam atualizados e descrevendo corretamente parâmetros, respostas, erros e..."
            className="max-h-[300px]"
            {...register('description')}
            required
          />
        </FormGroup>

        <FormGroup error={termErrorMessage}>
          <Controller
            name="term"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                label="Prazo"
                date={value}
                onSelectDate={onChange}
                hasError={!!termErrorMessage}
              />
            )}
          />
        </FormGroup>

        <FormGroup error={priorityErrorMessage}>
          <Label htmlFor="priority">Prioridade</Label>
          <Controller
            name="priority"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TaskRadioGroup<TaskPriority>
                options={optionsTaskPriority}
                value={value}
                onValueChange={onChange}
              />
            )}
          />
        </FormGroup>

        <FormGroup error={statusErrorMessage}>
          <Label htmlFor="status">Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TaskRadioGroup<TaskStatus>
                options={optionsTaskStatus}
                value={value}
                onValueChange={onChange}
              />
            )}
          />
        </FormGroup>
      </form>
    </SheetTemplate>
  );
}
