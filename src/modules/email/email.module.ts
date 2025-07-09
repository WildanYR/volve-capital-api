import { Module } from '@nestjs/common';
import { EmailDbProvider } from './email-db.provider';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';

@Module({
  imports: [PaginateOrderModule],
  controllers: [EmailController],
  providers: [...EmailDbProvider, EmailService],
})
export class EmailModule {}
