import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

import { Pagination } from '@challenge/shared';

export class PaginationQueryParam implements Pagination {
  @ApiProperty({
    example: 1,
    description: 'Page number (starts from 1).',
    default: 1,
    required: false,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Transform(({ value: page }: { value: string }) => {
    const numValue = page ? Number(page) : 1;

    return Math.max(1, numValue);
  })
  page: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page.',
    default: 10,
    required: false,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Transform(({ value: size }: { value: string }) => {
    const numValue = size ? Number(size) : 10;

    return Math.max(1, numValue);
  })
  size: number = 10;
}
