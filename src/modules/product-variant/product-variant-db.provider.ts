import { Provider } from '@nestjs/common';
import { PRODUCT_VARIANT_REPOSITORY } from 'src/constant/database.const';
import { ProductVariant } from 'src/database/models/product-variant.model';

export const ProductVariantDbProvider: Provider[] = [
  { provide: PRODUCT_VARIANT_REPOSITORY, useValue: ProductVariant },
];
