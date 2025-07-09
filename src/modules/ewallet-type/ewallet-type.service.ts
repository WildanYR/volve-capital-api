import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EWALLET_TYPE_REPOSITORY } from 'src/constant/database.const';
import { EWalletType } from 'src/database/models/ewallet-type.model';
import { CreateEWalletTypeDto } from './dto/create-ewallet-type.dto';
import { UpdateEWalletTypeDto } from './dto/update-ewallet-type.dto';
import { Order, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { IEwalletTypeFilter } from './types/ewallet-type-filter.type';

@Injectable()
export class EWalletTypeService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    @Inject(EWALLET_TYPE_REPOSITORY)
    private readonly eWalletTypeRepository: typeof EWalletType,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: IEwalletTypeFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);

    const whereOptions: WhereOptions = {};

    if (filter?.name) {
      whereOptions.name = { [Op.like]: `%${filter.name}%` };
    }

    const eWalletTypes = await this.eWalletTypeRepository.findAndCountAll({
      where: whereOptions,
      order: order as Order,
      limit,
      offset,
    });

    return this.paginateOrderService.paginateOrderResponse(
      eWalletTypes.rows,
      eWalletTypes.count,
      paginateOrder,
    );
  }

  async findOne(eWalletTypeId: number) {
    const eWalletType = await this.eWalletTypeRepository.findOne({
      where: { id: eWalletTypeId },
    });

    if (!eWalletType)
      throw new NotFoundException(
        `eWalletType dengan id: ${eWalletTypeId} tidak ditemukan`,
      );

    return eWalletType;
  }

  async create(createEWalletTypeDto: CreateEWalletTypeDto) {
    return this.eWalletTypeRepository.create({ ...createEWalletTypeDto });
  }

  async update(
    eWalletTypeId: number,
    updateEWalletTypeDto: UpdateEWalletTypeDto,
  ) {
    const eWalletType = await this.findOne(eWalletTypeId);

    return eWalletType.update({ ...updateEWalletTypeDto });
  }

  async remove(eWalletTypeId: number) {
    const eWalletType = await this.findOne(eWalletTypeId);
    await eWalletType.destroy();
  }
}
