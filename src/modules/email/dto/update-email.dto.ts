import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateEmailDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  register_device_id: number;
}
