import { ApiProperty } from '@nestjs/swagger';

import { UserResponse } from './user.response';

export class AccessTokenWithUserResponse {
  @ApiProperty({
    description: 'User data',
    type: UserResponse,
  })
  user: UserResponse;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNTk1MTZmMi1lZWMwLTQzY2EtOTNiMy0yYzQ0ZjEyYzA1NTkiLCJpYXQiOjE3NjI5Nzc4NDcsImV4cCI6MTc2Mjk3ODc0N30.HrP9EFslGz8bkCjQW03tAbZBJlJ8S1l5IYqVg4m0ULs',
    description: 'JWT access token generated after successful authentication.',
  })
  accessToken: string;
}
