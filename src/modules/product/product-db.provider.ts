import { Provider } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/constant/database.const';
import { Product } from 'src/database/models/product.model';

export const ProductDbProvider: Provider[] = [
  { provide: PRODUCT_REPOSITORY, useValue: Product },
];
