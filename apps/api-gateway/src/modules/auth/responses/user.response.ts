import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    example: 'a208817e-9dd3-4d40-b19c-d94c12843c92',
    description: 'User ID (UUID)',
  })
  id: string;

  @ApiProperty({
    example: 'email@email.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'kadadniel',
    description: 'User username',
  })
  username: string;

  @ApiProperty({
    example: '2025-11-19T20:19:39.569Z',
    description: 'User creation date',
  })
  createdAt: Date;
}
