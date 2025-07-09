import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateEmailDto {
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  register_device_id: number;
}
