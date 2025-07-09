import { Provider } from '@nestjs/common';
import { PRODUCT_ACCOUNT_USER_REPOSITORY } from 'src/constant/database.const';
import { ProductAccountUser } from 'src/database/models/product-account-user.model';

export const ProductAccountUserDbProvider: Provider[] = [
  { provide: PRODUCT_ACCOUNT_USER_REPOSITORY, useValue: ProductAccountUser },
];
