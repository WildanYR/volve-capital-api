import { IsIn, IsOptional, IsString } from 'class-validator';

export type OrderDirection = 'asc' | 'desc';

export class OrderByDto {
  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderDirection?: OrderDirection;
}
