import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceDbProvider } from './device-db.provider';
import { DeviceService } from './device.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';

@Module({
  imports: [PaginateOrderModule],
  controllers: [DeviceController],
  providers: [...DeviceDbProvider, DeviceService],
})
export class DeviceModule {}
