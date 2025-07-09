import { Module } from '@nestjs/common';
import { PaginateOrderService } from './paginate-order.service';

@Module({
  providers: [PaginateOrderService],
  exports: [PaginateOrderService],
})
export class PaginateOrderModule {}
