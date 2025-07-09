import { Module } from '@nestjs/common';
import { ProductAccountUserController } from './product-account-user.controller';
import { ProductAccountUserDbProvider } from './product-account-user-db.provider';
import { ProductAccountUserService } from './product-account-user.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';
import { ProductAccountModule } from '../product-account/product-account.module';

@Module({
  imports: [PaginateOrderModule, ProductAccountModule],
  controllers: [ProductAccountUserController],
  providers: [...ProductAccountUserDbProvider, ProductAccountUserService],
  exports: [ProductAccountUserService],
})
export class ProductAccountUserModule {}
