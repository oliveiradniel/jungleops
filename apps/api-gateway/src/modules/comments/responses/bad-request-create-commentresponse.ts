import { ApiProperty } from '@nestjs/swagger';
import { BadRequestBaseResponse } from 'src/shared/responses/bad-request-base.response';

export class BadRequestCreateCommentResponse extends BadRequestBaseResponse {
  @ApiProperty({
    type: [String],
    example: [
      'userId should not be empty',
      'userId must be a UUID',
      'comment should not be empty',
      'comment must be a string',
    ],
    description: 'Validation error messages for the provided input fields.',
  })
  message: string[];
}
