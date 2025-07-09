import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsNotEmpty({ message: 'Varian Produk tidak boleh kosong' })
  @IsNumber()
  product_variant_id: number;
}
