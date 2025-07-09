import { Module } from '@nestjs/common';
import { ProductAccountController } from './product-account.controller';
import { ProductAccountDbProvider } from './product-account-db.provider';
import { ProductAccountService } from './product-account.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';
import { ProductVariantModule } from '../product-variant/product-variant.module';
import { ProductAccountUserDbProvider } from '../product-account-user/product-account-user-db.provider';

@Module({
  imports: [PaginateOrderModule, ProductVariantModule],
  controllers: [ProductAccountController],
  providers: [
    ...ProductAccountDbProvider,
    ...ProductAccountUserDbProvider,
    ProductAccountService,
  ],
  exports: [ProductAccountService],
})
export class ProductAccountModule {}
