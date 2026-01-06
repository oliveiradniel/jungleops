import { ApiProperty } from '@nestjs/swagger';
import { BadRequestBaseResponse } from 'src/shared/responses/bad-request-base.response';

export class BadRequestCreateTaskResponse extends BadRequestBaseResponse {
  @ApiProperty({
    type: [String],
    example: [
      'title should not be empty',
      'title must be a string',
      'description should not be empty',
      'description must be a string',
      'term must be a Date instance',
    ],
    description: 'Validation error messages for the provided input fields.',
  })
  message: string[];
}
