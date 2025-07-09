import { Provider } from '@nestjs/common';
import { PRODUCT_ACCOUNT_REPOSITORY } from 'src/constant/database.const';
import { ProductAccount } from 'src/database/models/product-account.model';

export const ProductAccountDbProvider: Provider[] = [
  { provide: PRODUCT_ACCOUNT_REPOSITORY, useValue: ProductAccount },
];
