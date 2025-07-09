import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateEWalletDto {
  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  registration_date: Date;

  @IsOptional()
  @IsNumber()
  simcard_id: number;

  @IsOptional()
  @IsNumber()
  device_id: number;
}
