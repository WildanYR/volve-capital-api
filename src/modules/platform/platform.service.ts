import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PLATFORM_REPOSITORY } from 'src/constant/database.const';
import { Platform } from 'src/database/models/platform.model';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { Order, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { IPlatformFilter } from './types/platform-filter.type';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';

@Injectable()
export class PlatformService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    @Inject(PLATFORM_REPOSITORY)
    private readonly platformRepository: typeof Platform,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: IPlatformFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);
    const whereOptions: WhereOptions = {};
    if (filter?.name) {
      whereOptions.name = { [Op.like]: `%${filter.name}%` };
    }

    const platforms = await this.platformRepository.findAndCountAll({
      where: whereOptions,
      order: order as Order,
      limit,
      offset,
    });

    return this.paginateOrderService.paginateOrderResponse(
      platforms.rows,
      platforms.count,
      paginateOrder,
    );
  }

  async findOne(platformId: number) {
    const platform = await this.platformRepository.findOne({
      where: { id: platformId },
    });

    if (!platform)
      throw new NotFoundException(
        `platform dengan id: ${platformId} tidak ditemukan`,
      );

    return platform;
  }

  async create(createPlatformDto: CreatePlatformDto) {
    return this.platformRepository.create({ ...createPlatformDto });
  }

  async update(platformId: number, updatePlatformDto: UpdatePlatformDto) {
    const platform = await this.findOne(platformId);

    return platform.update({ ...updatePlatformDto });
  }

  async remove(platformId: number) {
    const platform = await this.findOne(platformId);
    await platform.destroy();
  }
}
