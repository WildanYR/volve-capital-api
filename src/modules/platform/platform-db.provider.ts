import { Provider } from '@nestjs/common';
import { PLATFORM_REPOSITORY } from 'src/constant/database.const';
import { Platform } from 'src/database/models/platform.model';

export const PlatformDbProvider: Provider[] = [
  { provide: PLATFORM_REPOSITORY, useValue: Platform },
];
