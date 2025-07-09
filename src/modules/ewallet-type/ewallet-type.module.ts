import { Module } from '@nestjs/common';
import { EWalletTypeController } from './ewallet-type.controller';
import { EWalletTypeDbProvider } from './ewallet-type-db.provider';
import { EWalletTypeService } from './ewallet-type.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';

@Module({
  imports: [PaginateOrderModule],
  controllers: [EWalletTypeController],
  providers: [...EWalletTypeDbProvider, EWalletTypeService],
})
export class EWalletTypeModule {}
