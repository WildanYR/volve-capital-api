import { Provider } from '@nestjs/common';
import { SIMCARD_REPOSITORY } from 'src/constant/database.const';
import { Simcard } from 'src/database/models/simcard.model';

export const SimcardDbProvider: Provider[] = [
  { provide: SIMCARD_REPOSITORY, useValue: Simcard },
];
