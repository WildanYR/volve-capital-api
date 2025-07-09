import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductVariantDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  duration_hour: number;

  @IsOptional()
  @IsNumber()
  interval_hour: number;

  @IsOptional()
  @IsNumber()
  max_user: number;
}
