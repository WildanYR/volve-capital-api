import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DEVICE_REPOSITORY } from 'src/constant/database.const';
import { Device } from 'src/database/models/device.model';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Order, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { IDeviceFilter } from './types/device-filter.type';

@Injectable()
export class DeviceService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    @Inject(DEVICE_REPOSITORY) private readonly deviceRepository: typeof Device,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: IDeviceFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);
    const whereOptions: WhereOptions = {};
    if (filter?.name) {
      whereOptions.name = { [Op.like]: `%${filter.name}%` };
    }

    const devices = await this.deviceRepository.findAndCountAll({
      where: whereOptions,
      order: order as Order,
      limit,
      offset,
    });

    return this.paginateOrderService.paginateOrderResponse(
      devices.rows,
      devices.count,
      paginateOrder,
    );
  }

  async findOne(deviceId: number) {
    const device = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });

    if (!device)
      throw new NotFoundException(
        `device dengan id: ${deviceId} tidak ditemukan`,
      );

    return device;
  }

  async create(createDeviceDto: CreateDeviceDto) {
    return this.deviceRepository.create({ ...createDeviceDto });
  }

  async update(deviceId: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.findOne(deviceId);

    return device.update({ ...updateDeviceDto });
  }

  async remove(deviceId: number) {
    const device = await this.findOne(deviceId);
    await device.destroy();
  }
}
