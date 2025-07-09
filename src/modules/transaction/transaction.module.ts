import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionDbProvider } from './transaction-db.provider';
import { TransactionService } from './transaction.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';
import { ProductAccountUserModule } from '../product-account-user/product-account-user.module';

@Module({
  imports: [PaginateOrderModule, ProductAccountUserModule],
  controllers: [TransactionController],
  providers: [...TransactionDbProvider, TransactionService],
})
export class TransactionModule {}
