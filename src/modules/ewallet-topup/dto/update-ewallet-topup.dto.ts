import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateEWalletTopupDto {
  @IsNotEmpty({ message: 'Jumlah Topup tidak boleh kosong' })
  @IsNumber()
  amount: number;
}
