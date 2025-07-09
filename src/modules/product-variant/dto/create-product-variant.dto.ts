import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductVariantDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Durasi tidak boleh kosong' })
  @IsNumber()
  duration_hour: number;

  @IsOptional()
  @IsNumber()
  interval_hour: number;

  @IsNotEmpty()
  @IsNumber()
  cooldown: number;

  @IsNotEmpty({ message: 'Maksimal Pengguna tidak boleh kosong' })
  @IsNumber()
  max_user: number;

  @IsNotEmpty({ message: 'Produk tidak boleh kosong' })
  @IsNumber()
  product_id: number;
}
