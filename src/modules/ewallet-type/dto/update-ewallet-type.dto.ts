import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEWalletTypeDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString()
  readonly name: string;
}
