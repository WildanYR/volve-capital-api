import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  product_variant_id: number;

  @IsOptional()
  @IsNumber()
  product_account_id: number;

  @IsOptional()
  @IsNumber()
  product_account_user_id: number;
}
