import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEWalletTopupDto {
  @IsNotEmpty({ message: 'Jumlah Topup tidak boleh kosong' })
  @IsNumber()
  amount: number;

  @IsNotEmpty({ message: 'E-Wallet tidak boleh kosong' })
  @IsNumber()
  ewallet_id: number;
}
