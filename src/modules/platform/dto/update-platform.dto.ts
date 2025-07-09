import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePlatformDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  readonly name: string;
}
