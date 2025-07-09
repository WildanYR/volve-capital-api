import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  readonly name: string;
}
