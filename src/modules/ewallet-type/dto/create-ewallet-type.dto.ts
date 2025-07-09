import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEWalletTypeDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  readonly name: string;
}
