import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EWALLET_REPOSITORY } from 'src/constant/database.const';
import { EWallet } from 'src/database/models/ewallet.model';
import { CreateEWalletDto } from './dto/create-ewallet.dto';
import { UpdateEWalletDto } from './dto/update-ewallet.dto';
import { Order, WhereOptions } from 'sequelize';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { IEwalletFilter } from './types/ewallet-filter.type';
import { EWalletType } from 'src/database/models/ewallet-type.model';
import { Simcard } from 'src/database/models/simcard.model';
import { Device } from 'src/database/models/device.model';

@Injectable()
export class EWalletService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    @Inject(EWALLET_REPOSITORY)
    private readonly ewalletRepository: typeof EWallet,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: IEwalletFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);

    const whereOptions: WhereOptions = {};
    if (filter?.ewallet_type_id) {
      whereOptions.ewallet_type_id = filter.ewallet_type_id;
    }
    if (filter?.simcard_id) {
      whereOptions.simcard_id = filter.simcard_id;
    }
    if (filter?.device_id) {
      whereOptions.device_id = filter.device_id;
    }

    let orderOptions: Order;
    const split = order[0][0].split('.');
    if (split.length > 1) {
      if (split[0] === 'ewallet_type') {
        orderOptions = [
          [{ model: EWalletType, as: 'ewallet_type' }, split[1], order[0][1]],
        ];
      } else if (split[0] === 'simcard') {
        orderOptions = [
          [{ model: Simcard, as: 'simcard' }, split[1], order[0][1]],
        ];
      } else {
        orderOptions = [
          [{ model: Device, as: 'device' }, split[1], order[0][1]],
        ];
      }
    } else {
      orderOptions = order as Order;
    }

    const ewallet = await this.ewalletRepository.findAndCountAll({
      where: whereOptions,
      order: orderOptions,
      limit,
      offset,
      include: [
        { model: EWalletType, as: 'ewallet_type' },
        { model: Simcard, as: 'simcard' },
        { model: Device, as: 'device' },
      ],
    });

    return this.paginateOrderService.paginateOrderResponse(
      ewallet.rows,
      ewallet.count,
      paginateOrder,
    );
  }

  async findOne(ewalletId: number) {
    const ewallet = await this.ewalletRepository.findOne({
      where: { id: ewalletId },
      include: [
        { model: EWalletType, as: 'ewallet_type' },
        { model: Simcard, as: 'simcard' },
        { model: Device, as: 'device' },
      ],
    });

    if (!ewallet)
      throw new NotFoundException(
        `ewallet dengan id: ${ewalletId} tidak ditemukan`,
      );

    return ewallet;
  }

  async create(createEWalletDto: CreateEWalletDto) {
    return this.ewalletRepository.create({ ...createEWalletDto });
  }

  async update(ewalletId: number, updateEWalletDto: UpdateEWalletDto) {
    const ewallet = await this.findOne(ewalletId);

    return ewallet.update({ ...updateEWalletDto });
  }

  async remove(ewalletId: number) {
    const ewallet = await this.findOne(ewalletId);
    await ewallet.destroy();
  }
}
