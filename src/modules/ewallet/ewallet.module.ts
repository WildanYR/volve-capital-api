import { Module } from '@nestjs/common';
import { EWalletController } from './ewallet.controller';
import { EWalletDbProvider } from './ewallet-db.provider';
import { EWalletService } from './ewallet.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';

@Module({
  imports: [PaginateOrderModule],
  controllers: [EWalletController],
  providers: [...EWalletDbProvider, EWalletService],
})
export class EWalletModule {}
