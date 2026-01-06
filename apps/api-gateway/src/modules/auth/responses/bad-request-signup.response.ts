import { ApiProperty } from '@nestjs/swagger';

import { BadRequestBaseResponse } from 'src/shared/responses/bad-request-base.response';

export class BadRequestSignUpResponse extends BadRequestBaseResponse {
  @ApiProperty({
    type: [String],
    example: [
      'email must be an email',
      'email should not be empty',
      'username should not be empty',
      'username must be a string',
      'password must be longer than or equal to 8 characters',
    ],
    description: 'Validation error messages for the provided input fields.',
  })
  message: string[];
}
