import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UsersTasksService } from './users-tasks.service';

import { TaskIdParam } from 'src/shared/params/task-id.param';

import { UserIdDTO } from './dtos/user-id';

import { Participant } from '@challenge/shared';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadGatewayResponse } from 'src/shared/responses/bad-gateway.responde';
import { UnauthorizedResponse } from 'src/shared/responses/unauthorized.response';
import { ThrottlerResponse } from 'src/shared/responses/throttler.response';

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
@Controller('users-tasks')
export class UsersTasksController {
  constructor(private readonly usersTasksService: UsersTasksService) {}

  @ApiOkResponse({
    description: 'Returns a list of users associated with the specified task.',
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
  @Get(':taskId')
  async listUsersByTaskId(
    @Param() params: TaskIdParam,
  ): Promise<Participant[]> {
    const { taskId } = params;

    return this.usersTasksService.listUsersByTaskId(taskId);
  }

  @ApiOkResponse({
    description: 'Returns the user-task association after creation.',
    schema: {
      example: {
        id: '42435a6a-386c-4e30-87a9-f8fa50057f94',
        taskId: '68254159-63fe-481a-9841-8bca49cb53bc',
        userId: '04065352-c557-4e04-8bca-6d00d184cd0b',
        assignedAt: '2025-11-20T15:07:10.577Z',
      },
    },
  })
  @Post(':taskId')
  create(@Param() params: TaskIdParam, @Body() body: UserIdDTO) {
    const { taskId } = params;
    const { userId } = body;

    return this.usersTasksService.create({
      taskId,
      userId,
    });
  }
}
