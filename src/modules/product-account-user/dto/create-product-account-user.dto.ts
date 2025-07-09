import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductAccountUserDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Varian produk tidak boleh kosong' })
  @IsNumber()
  product_variant_id: number;
}
