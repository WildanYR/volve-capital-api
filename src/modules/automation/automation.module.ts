import { Module } from '@nestjs/common';
import { AutomationController } from './automation.controller';
import { AutomationDbProvider } from './automation-db.provider';
import { AutomationService } from './automation.service';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TransactionModule],
  controllers: [AutomationController],
  providers: [...AutomationDbProvider, AutomationService],
})
export class AutomationModule {}
