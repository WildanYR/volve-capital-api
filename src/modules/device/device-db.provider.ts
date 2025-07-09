import { Provider } from '@nestjs/common';
import { DEVICE_REPOSITORY } from 'src/constant/database.const';
import { Device } from 'src/database/models/device.model';

export const DeviceDbProvider: Provider[] = [
  { provide: DEVICE_REPOSITORY, useValue: Device },
];
