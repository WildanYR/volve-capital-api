import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductAccountDto {
  @IsNotEmpty({ message: 'Password akun tidak boleh kosong' })
  @IsString()
  account_password: string;

  @IsNotEmpty({ message: 'Tanggal langganan habis tidak boleh kosong' })
  @Type(() => Date)
  @IsDate()
  subscription_expiry: Date;

  @IsOptional()
  @IsString()
  status: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsNumber()
  email_id: number;

  @IsOptional()
  @IsNumber()
  ewallet_id: number;

  @IsNotEmpty({ message: 'Produk tidak boleh kosong' })
  @IsNumber()
  product_id: number;
}
