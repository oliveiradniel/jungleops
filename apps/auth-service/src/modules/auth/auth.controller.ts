import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import {
  AuthPayload,
  SessionPayload,
  SignInData,
  SignUpData,
  UserWithoutPassword,
} from '@challenge/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInData: SignInData): Promise<AuthPayload> {
    const { email, password } = signInData;

    return this.authService.signIn({ email, password });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(@Body() signUpData: SignUpData): Promise<AuthPayload> {
    const { email, username, password } = signUpData;

    return this.authService.signUp({
      email,
      username,
      password,
    });
  }

  @Post('refresh')
  refresh(@Body() userData: { userId: string }): Promise<SessionPayload> {
    const { userId } = userData;

    return this.authService.refresh(userId);
  }

  @Get('get-active-user/:userId')
  getActiveUser(
    @Param() userData: { userId: string },
  ): Promise<{ user: UserWithoutPassword }> {
    return this.authService.findActiveUser(userData.userId);
  }
}
