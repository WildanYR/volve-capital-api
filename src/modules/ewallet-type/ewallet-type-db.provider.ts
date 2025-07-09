import { Provider } from '@nestjs/common';
import { EWALLET_TYPE_REPOSITORY } from 'src/constant/database.const';
import { EWalletType } from 'src/database/models/ewallet-type.model';

export const EWalletTypeDbProvider: Provider[] = [
  { provide: EWALLET_TYPE_REPOSITORY, useValue: EWalletType },
];
