import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlatformDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  readonly name: string;
}
