import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group';

interface Options<TValue> {
  id: string;
  value: TValue;
  label: string;
}

interface TaskTadioGroupProps<TValue> {
  options: Options<TValue>[];
  value?: TValue;
  onValueChange: (value: string) => void;
}

export function TaskRadioGroup<TValue extends string>({
  options,
  value,
  onValueChange,
}: TaskTadioGroupProps<TValue>) {
  return (
    <RadioGroup
      defaultValue={options[0].value}
      value={value}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <div key={option.id} className="flex items-center gap-2">
          <RadioGroupItem id={option.id} value={option.value}>
            <RadioGroupIndicator />
            <Label
              htmlFor={option.id}
              className={cn('font-normal hover:cursor-pointer')}
            >
              {option.label}
            </Label>
          </RadioGroupItem>
        </div>
      ))}
    </RadioGroup>
  );
}
