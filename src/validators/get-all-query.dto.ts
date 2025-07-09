// src/common/dto/universal-get-all.dto.ts
import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export type OrderDirection = 'asc' | 'desc';

export type BaseGetAll = {
  page?: number;
  limit?: number;
  order_by?: string;
  order_direction?: OrderDirection;
};

export const BASE_GET_ALL_KEYS: (keyof BaseGetAll)[] = [
  'page',
  'limit',
  'order_by',
  'order_direction',
];

export class BaseGetAllDto implements BaseGetAll {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsString()
  order_by?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order_direction?: OrderDirection;
}
