import { Provider } from '@nestjs/common';
import { EWALLET_TYPE_REPOSITORY } from 'src/constant/database.const';
import { PlatformProduct } from 'src/database/models/platform-product.model';

export const PlatformProductDbProvider: Provider[] = [
  { provide: EWALLET_TYPE_REPOSITORY, useValue: PlatformProduct },
];
