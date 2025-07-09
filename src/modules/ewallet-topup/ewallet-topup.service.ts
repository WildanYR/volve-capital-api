import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EWALLET_TOPUP_REPOSITORY } from 'src/constant/database.const';
import { EWalletTopup } from 'src/database/models/ewallet-topup.model';
import { CreateEWalletTopupDto } from './dto/create-ewallet-topup.dto';
import { UpdateEWalletTopupDto } from './dto/update-ewallet-topup.dto';
import { Order, WhereOptions } from 'sequelize';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { IEwalletTopupFilter } from './types/ewallet-topup-filter.type';
import { EWallet } from 'src/database/models/ewallet.model';
import { EWalletType } from 'src/database/models/ewallet-type.model';
import { Simcard } from 'src/database/models/simcard.model';

@Injectable()
export class EWalletTopupService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    @Inject(EWALLET_TOPUP_REPOSITORY)
    private readonly eWalletTopupRepository: typeof EWalletTopup,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: IEwalletTopupFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);

    const whereOptions: WhereOptions = {};
    if (filter?.ewallet_id) {
      whereOptions.ewallet_id = filter.ewallet_id;
    }

    const ewalletTopup = await this.eWalletTopupRepository.findAndCountAll({
      where: whereOptions,
      order: order as Order,
      limit,
      offset,
      include: [
        {
          model: EWallet,
          as: 'ewallet',
          include: [
            { model: EWalletType, as: 'ewallet_type' },
            { model: Simcard, as: 'simcard' },
          ],
        },
      ],
    });

    return this.paginateOrderService.paginateOrderResponse(
      ewalletTopup.rows,
      ewalletTopup.count,
      paginateOrder,
    );
  }

  async findOne(eWalletTopupId: number) {
    const eWalletTopup = await this.eWalletTopupRepository.findOne({
      where: { id: eWalletTopupId },
      include: [
        {
          model: EWallet,
          as: 'ewallet',
          include: [
            { model: EWalletType, as: 'ewallet_type' },
            { model: Simcard, as: 'simcard' },
          ],
        },
      ],
    });

    if (!eWalletTopup)
      throw new NotFoundException(
        `eWalletTopup dengan id: ${eWalletTopupId} tidak ditemukan`,
      );

    return eWalletTopup;
  }

  async create(createEWalletTopupDto: CreateEWalletTopupDto) {
    return this.eWalletTopupRepository.create({ ...createEWalletTopupDto });
  }

  async update(
    eWalletTopupId: number,
    updateEWalletTopupDto: UpdateEWalletTopupDto,
  ) {
    const eWalletTopup = await this.findOne(eWalletTopupId);

    return eWalletTopup.update({ ...updateEWalletTopupDto });
  }

  async remove(eWalletTopupId: number) {
    const eWalletTopup = await this.findOne(eWalletTopupId);
    await eWalletTopup.destroy();
  }
}
