import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  readonly name: string;
}
