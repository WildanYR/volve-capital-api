import { Module } from '@nestjs/common';
import { ProductVariantController } from './product-variant.controller';
import { ProductVariantDbProvider } from './product-variant-db.provider';
import { ProductVariantService } from './product-variant.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';

@Module({
  imports: [PaginateOrderModule],
  controllers: [ProductVariantController],
  providers: [...ProductVariantDbProvider, ProductVariantService],
  exports: [ProductVariantService],
})
export class ProductVariantModule {}
