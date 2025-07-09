import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlatformProductDto {
  @IsNotEmpty({ message: 'Produk Platform ID tidak boleh kosong' })
  @IsString()
  platform_product_id: string;

  @IsNotEmpty({ message: 'Nama Produk tidak boleh kosong' })
  @IsString()
  product_name: string;

  @IsNotEmpty({ message: 'Platform tidak boleh kosong' })
  @IsNumber()
  platform_id: number;

  @IsNotEmpty({ message: 'Variant Produk tidak boleh kosong' })
  @IsNumber()
  product_variant_id: number;
}
