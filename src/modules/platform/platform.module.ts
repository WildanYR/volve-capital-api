import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformDbProvider } from './platform-db.provider';
import { PlatformService } from './platform.service';
import { PaginateOrderModule } from '../paginate-order/paginate-order.module';

@Module({
  imports: [PaginateOrderModule],
  controllers: [PlatformController],
  providers: [...PlatformDbProvider, PlatformService],
})
export class PlatformModule {}
