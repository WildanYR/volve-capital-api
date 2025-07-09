import { Provider } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from 'src/constant/database.const';
import { Transaction } from 'src/database/models/transaction.model';

export const TransactionDbProvider: Provider[] = [
  { provide: TRANSACTION_REPOSITORY, useValue: Transaction },
];
