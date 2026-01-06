import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { CreateCommentData } from '@challenge/shared';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDTO implements CreateCommentData {
  @ApiProperty({
    example: 'e273d906-dc4b-4609-9fb7-b41efe35a35e',
    description: 'User ID to assign to the comment.',
  })
  @IsUUID('4')
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example:
      'Boa oportunidade para testar componentes acessíveis e ver como eles se comportam em diferentes navegadores.',
    description: 'User feedback or observations related to the task.',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
