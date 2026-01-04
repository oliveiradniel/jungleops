import { useRegisterController } from './use-register-form-controller';

import { Label } from '@/view/components/ui/label';
import { Input } from '@/view/components/ui/input';
import { Button } from '@/view/components/ui/button';
import { InputPassword } from '@/view/components/ui/input-password';
import { FormGroup } from '@/view/components/ui/form-group';

export function Register() {
  const {
    register,
    handleSubmit,
    emailErrorMessage,
    usernameErrorMessage,
    passwordErrorMessage,
    isFormInvalid,
    isRegisterLoading,
  } = useRegisterController();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormGroup error={emailErrorMessage}>
        <Label htmlFor="email">E-mail</Label>
        <Input
          aria-invalid={!!emailErrorMessage}
          id="email"
          type="email"
          placeholder="lorem@email.com"
          {...register('email')}
          required
        />
      </FormGroup>

      <FormGroup error={usernameErrorMessage}>
        <Label htmlFor="username">Nome de usuário</Label>
        <Input
          aria-invalid={!!usernameErrorMessage}
          id="username"
          placeholder="lorem"
          {...register('username')}
          required
        />
      </FormGroup>

      <FormGroup error={passwordErrorMessage}>
        <Label htmlFor="password">Senha</Label>
        <InputPassword
          aria-invalid={!!passwordErrorMessage}
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          required
        />
      </FormGroup>

      <Button
        type="submit"
        disabled={isFormInvalid || isRegisterLoading}
        isLoading={isRegisterLoading}
        className="w-full"
      >
        Criar conta
      </Button>
    </form>
  );
}
