import { Module } from '@nestjs/common';
import { PlatformProductController } from './platform-product.controller';
import { PlatformProductDbProvider } from './platform-product-db.provider';
import { PlatformProductService } from './platform-product.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';

@Module({
  imports: [PaginateOrderModule],
  controllers: [PlatformProductController],
  providers: [...PlatformProductDbProvider, PlatformProductService],
})
export class PlatformProductModule {}
