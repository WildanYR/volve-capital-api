import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductAccountDto {
  @IsOptional()
  @IsString()
  account_password?: string | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  subscription_expiry?: Date | null;

  @IsOptional()
  @IsString()
  status?: string | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  batch_start_date?: Date | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  batch_end_date?: Date | null;

  @IsOptional()
  @IsNumber()
  product_id?: number | null;

  @IsOptional()
  @IsNumber()
  ewallet_id?: number | null;

  @IsOptional()
  @IsNumber()
  product_variant_id?: number | null;
}
