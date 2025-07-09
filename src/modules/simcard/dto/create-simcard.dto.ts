import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSimcardDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  simcard_number: string;

  @IsOptional()
  @IsString()
  location: string;
}
