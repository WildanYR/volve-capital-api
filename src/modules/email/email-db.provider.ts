import { Provider } from '@nestjs/common';
import { EMAIL_REPOSITORY } from 'src/constant/database.const';
import { Email } from 'src/database/models/email.model';

export const EmailDbProvider: Provider[] = [
  { provide: EMAIL_REPOSITORY, useValue: Email },
];
