import { Provider } from '@nestjs/common';
import { EWALLET_REPOSITORY } from 'src/constant/database.const';
import { EWallet } from 'src/database/models/ewallet.model';

export const EWalletDbProvider: Provider[] = [
  { provide: EWALLET_REPOSITORY, useValue: EWallet },
];
