import { Module } from '@nestjs/common';
import { SimcardController } from './simcard.controller';
import { SimcardDbProvider } from './simcard-db.provider';
import { SimcardService } from './simcard.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';

@Module({
  imports: [PaginateOrderModule],
  controllers: [SimcardController],
  providers: [...SimcardDbProvider, SimcardService],
})
export class SimcardModule {}
