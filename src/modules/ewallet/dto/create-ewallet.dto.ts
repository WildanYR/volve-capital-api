import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateEWalletDto {
  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  registration_date: Date;

  @IsNotEmpty({ message: 'Nomor Telepon tidak boleh kosong' })
  @IsNumber()
  simcard_id: number;

  @IsNotEmpty({ message: 'Jenis E-Wallet tidak boleh kosong' })
  @IsNumber()
  ewallet_type_id: number;

  @IsNotEmpty({ message: 'Device mendaftar tidak boleh kosong' })
  @IsNumber()
  device_id: number;
}
