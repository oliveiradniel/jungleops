import { Body, Controller, Get, Post } from '@nestjs/common';

import { UsersService } from './users.service';

import { UserWithoutPassword } from '@challenge/shared';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('get-users')
  findUsers(@Body('ids') ids: string[]): Promise<UserWithoutPassword[]> {
    return this.usersService.findUsers(ids);
  }

  @Get()
  list(): Promise<UserWithoutPassword[]> {
    return this.usersService.listUsers();
  }

  @Get('ids')
  listUserIds(): Promise<string[]> {
    return this.usersService.listUserIds();
  }
}
