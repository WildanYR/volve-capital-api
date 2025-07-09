import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';
import { IPagination } from '../types/pagination.type';

export class PaginationDTO implements IPagination {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
