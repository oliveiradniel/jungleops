import { useLoginController } from './use-login-controller';

import { FormGroup } from '@/view/components/ui/form-group';
import { Label } from '@/view/components/ui/label';
import { Input } from '@/view/components/ui/input';
import { InputPassword } from '@/view/components/ui/input-password';
import { Button } from '@/view/components/ui/button';

export function Login() {
  const {
    register,
    handleSubmit,
    emailErrorMessage,
    passwordErrorMessage,
    isFormInvalid,
    isLoginLoading,
  } = useLoginController();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        disabled={isFormInvalid || isLoginLoading}
        isLoading={isLoginLoading}
        className="w-full"
      >
        Entrar
      </Button>
    </form>
  );
}
