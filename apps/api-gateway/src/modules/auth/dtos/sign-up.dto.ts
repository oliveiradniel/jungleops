import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { SignUpData } from '@challenge/shared';

export class SignUpDTO implements SignUpData {
  @ApiProperty({
    example: 'email@email.com',
    description: 'User email.',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'kadadniel',
    description: 'Username.',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password.',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
