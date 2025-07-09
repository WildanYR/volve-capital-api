import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SIMCARD_REPOSITORY } from 'src/constant/database.const';
import { Simcard } from 'src/database/models/simcard.model';
import { CreateSimcardDto } from './dto/create-simcard.dto';
import { UpdateSimcardDto } from './dto/update-simcard.dto';
import { Order, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { ISimcardFilter } from './types/simcard-filter.type';

@Injectable()
export class SimcardService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    @Inject(SIMCARD_REPOSITORY)
    private readonly simcardRepository: typeof Simcard,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: ISimcardFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);

    const whereOptions: WhereOptions = {};

    if (filter?.simcard_number) {
      whereOptions.simcard_number = { [Op.like]: `%${filter.simcard_number}%` };
    }

    const simcards = await this.simcardRepository.findAndCountAll({
      where: whereOptions,
      order: order as Order,
      limit,
      offset,
    });

    return this.paginateOrderService.paginateOrderResponse(
      simcards.rows,
      simcards.count,
      paginateOrder,
    );
  }

  async findOne(simcardId: number) {
    const simcard = await this.simcardRepository.findOne({
      where: { id: simcardId },
    });

    if (!simcard)
      throw new NotFoundException(
        `simcard dengan id: ${simcardId} tidak ditemukan`,
      );

    return simcard;
  }

  async create(createSimcardDto: CreateSimcardDto) {
    return this.simcardRepository.create({ ...createSimcardDto });
  }

  async update(simcardId: number, updateSimcardDto: UpdateSimcardDto) {
    const simcard = await this.findOne(simcardId);

    return simcard.update({ ...updateSimcardDto });
  }

  async remove(simcardId: number) {
    const simcard = await this.findOne(simcardId);
    await simcard.destroy();
  }
}
