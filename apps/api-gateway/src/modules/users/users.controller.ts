import { Controller, Get } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';

import { BadGatewayResponse } from 'src/shared/responses/bad-gateway.responde';
import { UnauthorizedResponse } from 'src/shared/responses/unauthorized.response';
import { ThrottlerResponse } from 'src/shared/responses/throttler.response';

import type { UserWithoutPassword } from '@challenge/shared';

@ApiBearerAuth()
@ApiBadGatewayResponse({
  description:
    'The gateway received an invalid response or no response from a microservice.',
  type: BadGatewayResponse,
})
@ApiUnauthorizedResponse({
  description: 'Invalid token or missing token.',
  type: UnauthorizedResponse,
})
@ApiResponse({
  status: 429,
  description:
    'Too many requests. The client has exceeded the rate limit of 10 requests per second.',
  type: ThrottlerResponse,
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'List of all users information.',
    isArray: true,
    schema: {
      example: [
        {
          id: '04065352-c557-4e04-8bca-6d00d184cd0b',
          email: 'kadadniel@gmail.com',
          username: 'kadadniel',
          createdAt: '2025-11-17T14:23:34.994Z',
        },
        {
          id: '1d038015-5878-4d8b-8bfa-7d54a0754d59',
          email: 'kadadniel2@gmail.com',
          username: 'kadadniel2',
          createdAt: '2025-11-19T20:19:39.569Z',
        },
      ],
    },
  })
  @Get()
  list(): Promise<UserWithoutPassword[]> {
    return this.usersService.listUsers();
  }
}
