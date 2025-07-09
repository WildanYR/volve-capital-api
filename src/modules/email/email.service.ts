import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EMAIL_REPOSITORY } from 'src/constant/database.const';
import { Email } from 'src/database/models/email.model';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { Order, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { IEmailFilter } from './types/email-filter.type';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { Device } from 'src/database/models/device.model';

@Injectable()
export class EmailService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    @Inject(EMAIL_REPOSITORY) private readonly emailRepository: typeof Email,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: IEmailFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);

    const whereOptions: WhereOptions = {};
    if (filter?.email) {
      whereOptions.email = { [Op.like]: `%${filter.email}%` };
    }
    if (filter?.register_device_id) {
      whereOptions.register_device_id = filter.register_device_id;
    }

    const emails = await this.emailRepository.findAndCountAll({
      where: whereOptions,
      order: order as Order,
      limit,
      offset,
      include: [{ model: Device, as: 'device' }],
    });

    return this.paginateOrderService.paginateOrderResponse(
      emails.rows,
      emails.count,
      paginateOrder,
    );
  }

  async findOne(emailId: number) {
    const email = await this.emailRepository.findOne({
      where: { id: emailId },
      include: [{ model: Device, as: 'device' }],
    });

    if (!email)
      throw new NotFoundException(
        `email dengan id: ${emailId} tidak ditemukan`,
      );

    return email;
  }

  async create(createEmailDto: CreateEmailDto) {
    return this.emailRepository.create({ ...createEmailDto });
  }

  async update(emailId: number, updateEmailDto: UpdateEmailDto) {
    const email = await this.findOne(emailId);

    return email.update({ ...updateEmailDto });
  }

  async remove(emailId: number) {
    const email = await this.findOne(emailId);
    await email.destroy();
  }
}
