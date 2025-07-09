import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { AtLeastOnePropertyPipe } from 'src/pipes/at-least-one-property.pipe';
import { GetAllDevicesQueryDto } from './dto/get-all-device-query';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';

@Controller('device')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly paginateOrderService: PaginateOrderService,
  ) {}

  @Get()
  findAll(@Query() query: GetAllDevicesQueryDto) {
    const { paginateOrder, filter } =
      this.paginateOrderService.separateQueryParameters(query);
    return this.deviceService.findAll(paginateOrder, filter);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.deviceService.findOne(id);
  }

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Patch(':id')
  @UsePipes(AtLeastOnePropertyPipe)
  update(
    @Param('id', ParseIntPipe) deviceId: number,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.deviceService.update(deviceId, updateDeviceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) deviceId: number) {
    return this.deviceService.remove(deviceId);
  }
}
