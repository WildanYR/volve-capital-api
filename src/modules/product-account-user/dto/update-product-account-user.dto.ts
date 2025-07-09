import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductAccountUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  account_profile: string;

  @IsOptional()
  @IsNumber()
  product_account_id: number;

  @IsOptional()
  @IsString()
  status: string;
}
