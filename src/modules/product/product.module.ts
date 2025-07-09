import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductDbProvider } from './product-db.provider';
import { ProductService } from './product.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';

@Module({
  imports: [PaginateOrderModule],
  controllers: [ProductController],
  providers: [...ProductDbProvider, ProductService],
})
export class ProductModule {}
