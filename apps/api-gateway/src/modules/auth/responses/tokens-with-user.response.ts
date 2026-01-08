import { ApiProperty } from '@nestjs/swagger';

import { TokensResponse } from './tokens.response';
import { UserResponse } from './user.response';

export class TokensWithUserResponse extends TokensResponse {
  @ApiProperty({
    description: 'User data',
    type: UserResponse,
  })
  user: UserResponse;
}
