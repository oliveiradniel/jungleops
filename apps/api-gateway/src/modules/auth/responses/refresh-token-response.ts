import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNTk1MTZmMi1lZWMwLTQzY2EtOTNiMy0yYzQ0ZjEyYzA1NTkiLCJpYXQiOjE3NjMwMjQ0NzAsImV4cCI6MTc2MzExMDg3MH0.85dukew1JnhdQGxzFSGySB-qMEpdXmBkFdGw44gjGMs',
    description: 'JWT refresh token generated after successful authentication.',
  })
  refreshToken: string;
}
