import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  MYSQL_PROVIDER,
  PRODUCT_ACCOUNT_USER_REPOSITORY,
} from 'src/constant/database.const';
import { ProductAccountUser } from 'src/database/models/product-account-user.model';
import { Order, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { CreateProductAccountUserDto } from './dto/create-product-account-user.dto';
import { UpdateProductAccountUserDto } from './dto/update-product-account-user.dto';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { IProductAccountUserFilter } from './types/product-account-user-filter.type';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { ProductAccount } from 'src/database/models/product-account.model';
import { Email } from 'src/database/models/email.model';
import { Product } from 'src/database/models/product.model';
import { ProductVariant } from 'src/database/models/product-variant.model';
import { ProductAccountService } from '../product-account/product-account.service';
import { UpdateProductAccountDto } from '../product-account/dto/update-product-account.dto';
import { MysqlProvider } from 'src/database/mysql.provider';

@Injectable()
export class ProductAccountUserService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    private readonly productAccountService: ProductAccountService,
    @Inject(MYSQL_PROVIDER) private mysqlProvider: MysqlProvider,
    @Inject(PRODUCT_ACCOUNT_USER_REPOSITORY)
    private readonly productAccountUserRepository: typeof ProductAccountUser,
  ) {}

  async findAll(
    paginateOrder?: BaseGetAll,
    filter?: IProductAccountUserFilter,
  ) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);
    const whereOptions: WhereOptions = {};
    const emailWhereOptions: WhereOptions = {};
    const productWhereOptions: WhereOptions = {};
    if (filter?.name) {
      whereOptions.name = { [Op.like]: `%${filter.name}%` };
    }
    if (filter?.email_id) {
      emailWhereOptions.id = filter.email_id;
    }
    if (filter?.product_id) {
      productWhereOptions.id = filter.product_id;
    }

    const productAccountUser =
      await this.productAccountUserRepository.findAndCountAll({
        where: whereOptions,
        order: order as Order,
        limit,
        offset,
        include: [
          {
            model: ProductAccount,
            as: 'product_account',
            include: [
              {
                model: Email,
                as: 'email',
                where: emailWhereOptions,
                required: true,
              },
            ],
            required: true,
          },
          {
            model: ProductVariant,
            as: 'product_variant',
            include: [
              {
                model: Product,
                as: 'product',
                where: productWhereOptions,
                required: true,
              },
            ],
          },
        ],
      });

    return this.paginateOrderService.paginateOrderResponse(
      productAccountUser.rows,
      productAccountUser.count,
      paginateOrder,
    );
  }

  async findOne(productAccountUserId: number) {
    const productAccountUser = await this.productAccountUserRepository.findOne({
      where: { id: productAccountUserId },
      include: [
        {
          model: ProductAccount,
          as: 'product_account',
          include: [{ model: Email, as: 'email' }],
        },
        {
          model: ProductVariant,
          as: 'product_variant',
          include: [
            {
              model: Product,
              as: 'product',
            },
          ],
        },
      ],
    });

    if (!productAccountUser)
      throw new NotFoundException(
        `productAccountUser dengan id: ${productAccountUserId} tidak ditemukan`,
      );

    return productAccountUser;
  }

  async create(createProductAccountUserDto: CreateProductAccountUserDto) {
    const productAccount = await this.productAccountService.findUsable(
      createProductAccountUserDto.product_variant_id,
    );

    const now = new Date();
    const msToAdd =
      productAccount.product_variant!.duration_hour * 60 * 60 * 1000;
    const updateProductAccountData: UpdateProductAccountDto = {
      batch_end_date: new Date(now.getTime() + msToAdd),
    };

    if (!productAccount.batch_start_date) {
      updateProductAccountData.batch_start_date = new Date();
    }
    if (productAccount.status === 'KOSONG') {
      updateProductAccountData.status = 'AKTIF';
    }
    const transaction = await this.mysqlProvider.transaction();
    try {
      await this.productAccountService.update(
        productAccount.id,
        updateProductAccountData,
        transaction,
      );

      const userCount = await this.productAccountUserRepository.count({
        where: { product_account_id: productAccount.id, status: 'AKTIF' },
      });
      const alphaMap = [
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ];

      const productAccountUser = await this.productAccountUserRepository.create(
        {
          name: createProductAccountUserDto.name,
          product_account_id: productAccount.id,
          product_variant_id: createProductAccountUserDto.product_variant_id,
          status: 'AKTIF',
          account_profile: alphaMap[userCount],
        },
        { transaction },
      );
      await transaction.commit();
      return productAccountUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(
    productAccountUserId: number,
    updateProductAccountUserDto: UpdateProductAccountUserDto,
  ) {
    const productAccountUser = await this.findOne(productAccountUserId);

    return productAccountUser.update({ ...updateProductAccountUserDto });
  }

  async remove(productAccountUserId: number) {
    const productAccountUser = await this.findOne(productAccountUserId);
    await productAccountUser.destroy();
  }
}
