import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { SignInData } from '@challenge/shared';

export class SignInDTO implements SignInData {
  @ApiProperty({
    example: 'email@email.com',
    description: 'User email.',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

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
