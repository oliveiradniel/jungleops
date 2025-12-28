import { useUpdateTaskSheetController } from './use-update-task-sheet-controller';

import { Controller } from 'react-hook-form';

import { SheetTemplate } from '../sheet-template';
import { FormGroup } from '../ui/form-group';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { DatePicker } from '../ui/date-picker';
import { TaskRadioGroup } from '../task-radio-group';
import { CheckboxIndicator, CheckboxItem } from '../ui/checkbox';

import type { Task } from '@/app/entities/task';
import type { TaskPriority, TaskStatus } from '@challenge/shared';

export function UpdateTaskSheet({ taskData }: { taskData: Task | undefined }) {
  const {
    control,
    register,
    handleSubmit,
    optionsTaskPriority,
    optionsTaskStatus,
    titleErrorMessage,
    descriptionErrorMessage,
    termErrorMessage,
    users,
    priorityErrorMessage,
    statusErrorMessage,
    usersErrorMessage,
    isFormInvalid,
    isUpdateTaskSheetOpen,
    isUpdateTaskLoading,
    handleCloseUpdateTaskSheet,
  } = useUpdateTaskSheetController(taskData);

  return (
    <SheetTemplate
      isOpen={isUpdateTaskSheetOpen}
      title="Editar tarefa"
      description="Atualize os detalhes da demanda para manter todos alinhados e garantir que o fluxo de trabalho continue eficiente."
      isSubmitting={isUpdateTaskLoading}
      isFormInvalid={isFormInvalid}
      onClose={handleCloseUpdateTaskSheet}
      buttonLabel="Atualizar"
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

        {users && users.length > 0 && (
          <FormGroup error={usersErrorMessage}>
            <Label htmlFor="status">Usuários</Label>

            <Controller
              control={control}
              name="userIds"
              render={({ field: { value = [], onChange } }) => (
                <>
                  {users.map(({ id, username }) => {
                    const isChecked = value.includes(id);

                    return (
                      <div key={id} className="flex items-center gap-2">
                        <CheckboxItem
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              onChange([...value, id]);
                            } else {
                              onChange(value.filter((userId) => userId !== id));
                            }
                          }}
                        >
                          <CheckboxIndicator />

                          <Label htmlFor="" className="font-normal">
                            {username}
                          </Label>
                        </CheckboxItem>
                      </div>
                    );
                  })}
                </>
              )}
            />
          </FormGroup>
        )}
      </form>
    </SheetTemplate>
  );
}
