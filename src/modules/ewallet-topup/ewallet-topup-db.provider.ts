import { Provider } from '@nestjs/common';
import { EWALLET_TOPUP_REPOSITORY } from 'src/constant/database.const';
import { EWalletTopup } from 'src/database/models/ewallet-topup.model';

export const EWalletTopupDbProvider: Provider[] = [
  { provide: EWALLET_TOPUP_REPOSITORY, useValue: EWalletTopup },
];
