import { Module } from '@nestjs/common';
import { EWalletTopupController } from './ewallet-topup.controller';
import { EWalletTopupDbProvider } from './ewallet-topup-db.provider';
import { EWalletTopupService } from './ewallet-topup.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';

@Module({
  imports: [PaginateOrderModule],
  controllers: [EWalletTopupController],
  providers: [...EWalletTopupDbProvider, EWalletTopupService],
})
export class EWalletTopupModule {}
