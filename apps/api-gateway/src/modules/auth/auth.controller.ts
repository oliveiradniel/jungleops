import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import type { Request, Response } from 'express';

import { getConfig } from 'src/shared/config/config.helper';

import { AuthService } from './auth.service';

import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';

import { BadGatewayResponse } from 'src/shared/responses/bad-gateway.responde';
import { UnauthorizedAuthResponse } from './responses/unhautorized-auth-response';
import { BadRequestSignUpResponse } from './responses/bad-request-signup.response';
import { BadRequestSignInResponse } from './responses/bad-request-signin.response';
import { ConflictAuthResponse } from './responses/conflict-auth-response';
import { UnauthorizedResponse } from 'src/shared/responses/unauthorized.response';
import { ThrottlerResponse } from 'src/shared/responses/throttler.response';
import { TokensWithUserResponse } from './responses/tokens-with-user.response';
import { AccessTokenWithUserResponse } from './responses/access-token-with-user.response';
import { UserResponse } from './responses/user.response';

import { IsPublic } from 'src/shared/decorators/is-public-decorator.decorator';

import {
  JWT_REFRESH_STRATEGY_NAME,
  REFRESH_TOKEN_COOKIE_KEY,
} from 'src/shared/constants';

import type { SessionPayload, UserWithoutPassword } from '@challenge/shared';

@ApiBadGatewayResponse({
  description:
    'The gateway received an invalid response or no response from a microservice.',
  type: BadGatewayResponse,
})
@ApiResponse({
  status: 429,
  description:
    'Too many requests. The client has exceeded the rate limit of 10 requests per second.',
  type: ThrottlerResponse,
})
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOkResponse({
    description: 'Returns access and refresh tokens with user data.',
    type: TokensWithUserResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password.',
    type: UnauthorizedAuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'The user did not send an email or password.',
    type: BadRequestSignInResponse,
  })
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() body: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SessionPayload> {
    const { email, password } = body;

    const data = await this.authService.signIn({ email, password });

    const { NODE_ENV } = getConfig(this.configService);

    response.cookie(REFRESH_TOKEN_COOKIE_KEY, data.refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return { user: data.user, accessToken: data.accessToken };
  }

  @ApiCreatedResponse({
    description: 'Returns access and refresh tokens with user data.',
    type: TokensWithUserResponse,
  })
  @ApiConflictResponse({
    description: 'An user with this email or username already exists.',
    type: ConflictAuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'The user did not send an email, username or password.',
    type: BadRequestSignUpResponse,
  })
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(
    @Body() body: SignUpDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SessionPayload> {
    const { email, username, password } = body;

    const data = await this.authService.signUp({ email, username, password });

    const { NODE_ENV } = getConfig(this.configService);

    response.cookie(REFRESH_TOKEN_COOKIE_KEY, data.refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return { user: data.user, accessToken: data.accessToken };
  }

  @ApiOkResponse({
    description: 'Returns a new refresh token with user data.',
    type: AccessTokenWithUserResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid token or missing token.',
    type: UnauthorizedResponse,
  })
  @IsPublic()
  @UseGuards(AuthGuard(JWT_REFRESH_STRATEGY_NAME))
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Req() request: Request): Promise<SessionPayload> {
    const userId = request.user?.userId;

    const data = this.authService.refresh(userId!);

    return data;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Logs the user out and clears the refresh token cookie.',
    schema: {
      example: {
        message: 'Logged out successfully.',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid token or missing token.',
    type: UnauthorizedResponse,
  })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response): { message: string } {
    const { NODE_ENV } = getConfig(this.configService);

    response.cookie(REFRESH_TOKEN_COOKIE_KEY, '', {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      expires: new Date(0),
    });

    return { message: 'Logged out successfully.' };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Returns the authenticated user's data.",
    type: UserResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid token or missing token.',
    type: UnauthorizedResponse,
  })
  @Get('get-active-user')
  async findActiveUser(
    @Req() request: Request,
  ): Promise<{ user: UserWithoutPassword }> {
    const userId = request.user?.userId;

    const data = this.authService.findActiveUser(userId!);

    return data;
  }
}
