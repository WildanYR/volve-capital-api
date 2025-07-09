import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
