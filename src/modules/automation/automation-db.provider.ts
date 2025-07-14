import { Provider } from '@nestjs/common';
import {
  AUTO_BOT_MODULE_REPOSITORY,
  AUTO_BOT_REPOSITORY,
  AUTO_LOG_REPOSITORY,
  PLATFORM_PRODUCT_REPOSITORY,
  TRANSACTION_REPOSITORY,
} from 'src/constant/database.const';
import { AutoBotModule } from 'src/database/models/auto-bot-module.model';
import { AutoBot } from 'src/database/models/auto-bot.model';
import { AutoLog } from 'src/database/models/auto-log.model';
import { PlatformProduct } from 'src/database/models/platform-product.model';
import { Transaction } from 'src/database/models/transaction.model';

export const AutomationDbProvider: Provider[] = [
  { provide: AUTO_BOT_REPOSITORY, useValue: AutoBot },
  { provide: AUTO_BOT_MODULE_REPOSITORY, useValue: AutoBotModule },
  { provide: AUTO_LOG_REPOSITORY, useValue: AutoLog },
  { provide: PLATFORM_PRODUCT_REPOSITORY, useValue: PlatformProduct },
  { provide: TRANSACTION_REPOSITORY, useValue: Transaction },
];
