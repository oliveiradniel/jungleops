import * as React from 'react';

import { cn } from '@/lib/utils';

import { Eye, EyeOff } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group';

function InputPassword({
  className,
  'aria-invalid': ariaInvalid,
  ...props
}: React.ComponentProps<'input'>) {
  const [show, setShow] = React.useState(false);

  const isInvalid = ariaInvalid === true || ariaInvalid === 'true';

  function handleToggleTypePassword() {
    setShow((prevState) => !prevState);
  }

  return (
    <InputGroup>
      <InputGroupInput
        aria-invalid={ariaInvalid}
        className={cn('peer pr-8', className)}
        {...props}
        type={show ? 'text' : 'password'}
      />

      <InputGroupAddon>
        <button
          aria-label={show ? 'Esconder senha' : 'Mostrar senha'}
          type="button"
          onClick={handleToggleTypePassword}
          className={cn(
            'peer-focus:text-primary text-muted-foreground absolute top-1/2 right-1 -translate-y-1/2 p-2 transition-all hover:cursor-pointer',
            isInvalid && 'text-destructive!',
          )}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </InputGroupAddon>
    </InputGroup>
  );
}

export { InputPassword };
