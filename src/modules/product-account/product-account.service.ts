import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCT_ACCOUNT_REPOSITORY,
  PRODUCT_ACCOUNT_USER_REPOSITORY,
} from 'src/constant/database.const';
import {
  ProductAccount,
  ProductAccountAttributes,
} from 'src/database/models/product-account.model';
import { Order, Sequelize, WhereOptions } from 'sequelize';
import { CreateProductAccountDto } from './dto/create-product-account.dto';
import { UpdateProductAccountDto } from './dto/update-product-account.dto';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { IProductAccountFilter } from './types/product-account-filter.type';
import { Email } from 'src/database/models/email.model';
import { Product } from 'src/database/models/product.model';
import { ProductVariant } from 'src/database/models/product-variant.model';
import { EWallet } from 'src/database/models/ewallet.model';
import { EWalletType } from 'src/database/models/ewallet-type.model';
import { Simcard } from 'src/database/models/simcard.model';
import { ProductVariantService } from '../product-variant/product-variant.service';
import { Op } from 'sequelize';
import {
  ProductAccountUser,
  ProductAccountUserAttributes,
} from 'src/database/models/product-account-user.model';
import { Transaction } from 'sequelize';

@Injectable()
export class ProductAccountService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    private readonly productVariantService: ProductVariantService,
    @Inject(PRODUCT_ACCOUNT_REPOSITORY)
    private readonly productAccountRepository: typeof ProductAccount,
    @Inject(PRODUCT_ACCOUNT_USER_REPOSITORY)
    private readonly productAccountUserRepository: typeof ProductAccountUser,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: IProductAccountFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);

    const whereOptions: WhereOptions = {};
    if (filter?.email_id) {
      whereOptions.email_id = filter.email_id;
    }
    if (filter?.product_id) {
      whereOptions.product_id = filter.product_id;
    }

    const productAccount = await this.productAccountRepository.findAndCountAll({
      where: whereOptions,
      order: order as Order,
      limit,
      offset,
      include: [
        { model: Email, as: 'email' },
        { model: Product, as: 'product' },
        { model: ProductVariant, as: 'product_variant' },
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
      productAccount.rows,
      productAccount.count,
      paginateOrder,
    );
  }

  async findOne(productAccountId: number, transaction?: Transaction) {
    const productAccount = await this.productAccountRepository.findOne({
      where: { id: productAccountId },
      include: [
        { model: Email, as: 'email' },
        { model: Product, as: 'product' },
        { model: ProductVariant, as: 'product_variant' },
        {
          model: EWallet,
          as: 'ewallet',
          include: [
            { model: EWalletType, as: 'ewallet_type' },
            { model: Simcard, as: 'simcard' },
          ],
        },
      ],
      transaction,
    });

    if (!productAccount)
      throw new NotFoundException(
        `productAccount dengan id: ${productAccountId} tidak ditemukan`,
      );

    return productAccount;
  }

  async findUsable(productVariantId: number) {
    const productVariant = (
      await this.productVariantService.findOne(productVariantId)
    ).toJSON();
    if (!productVariant)
      throw new NotFoundException('varian produk tidak ditemukan');

    const productAccount = (await this.productAccountRepository.findAll({
      where: {
        product_variant_id: productVariantId,
        status: 'AKTIF',
        batch_end_date: { [Op.gt]: new Date() },
      },
      order: [['batch_start_date', 'asc']],
      raw: true,
      nest: true,
    })) as unknown as ProductAccountAttributes[];

    let usableProductAccountId: number | null = null;

    if (productAccount.length) {
      const productAccountIds = productAccount.map((item) => item.id);
      const userCount = (await this.productAccountUserRepository.findAll({
        attributes: [
          'product_account_id',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'user_count'],
        ],
        where: {
          status: 'AKTIF',
          product_account_id: { [Op.in]: productAccountIds },
        },
        group: ['product_account_id'],
        raw: true,
      })) as unknown as { product_account_id: number; user_count: number }[];

      const filteredProductAccount = productAccount.filter((item) => {
        for (const count of userCount) {
          if (count.product_account_id === item.id) {
            return count.user_count < productVariant.max_user;
          }
        }
        return false;
      });

      if (filteredProductAccount.length) {
        const filteredProductAccountIds = filteredProductAccount.map(
          (item) => item.id,
        );
        const users = (await this.productAccountUserRepository.findAll({
          where: { product_account_id: { [Op.in]: filteredProductAccountIds } },
          order: [['created_at', 'DESC']],
          raw: true,
        })) as unknown as ProductAccountUserAttributes[];
        if (users?.length) {
          const userMap = new Map();
          for (const user of users) {
            if (!userMap.has(user.product_account_id)) {
              userMap.set(user.product_account_id, {
                product_account_id: user.product_account_id,
                created_at: user.created_at,
              });
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const userArr: {
            product_account_id: number;
            created_at: Date;
          }[] = Array.from(userMap.values());
          console.log({ userArr });

          const now = new Date().getTime();
          for (const item of filteredProductAccount) {
            const intervalMillis =
              productVariant.interval_hour * 60 * 60 * 1000;
            const cooldownMillis = productVariant.cooldown * 60 * 1000;

            const batchStart = new Date(item.batch_start_date!).getTime();

            if (batchStart + intervalMillis >= now) {
              for (const user of userArr) {
                if (user.product_account_id === item.id) {
                  if (user.created_at.getTime() + cooldownMillis <= now) {
                    usableProductAccountId = item.id;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }

    if (!usableProductAccountId) {
      const emptyProductAccount = await this.productAccountRepository.findOne({
        where: {
          status: 'KOSONG',
          product_id: productVariant.product_id,
        },
      });

      if (!emptyProductAccount)
        throw new NotFoundException('Tidak ada akun tersedia');

      await emptyProductAccount.update({
        product_variant_id: productVariant.id,
      });
      usableProductAccountId = emptyProductAccount.id;
    }

    return this.findOne(usableProductAccountId);
  }

  async create(createProductAccountDto: CreateProductAccountDto) {
    const productAccount = await this.productAccountRepository.findOne({
      where: {
        email_id: createProductAccountDto.email_id,
        product_id: createProductAccountDto.product_id,
      },
      include: [
        {
          model: Email,
          as: 'email',
        },
        {
          model: Product,
          as: 'product',
        },
      ],
      raw: true,
      nest: true,
    });

    if (productAccount) {
      throw new BadRequestException(
        `${productAccount.email.email} sudah terdaftar di ${productAccount.product.name}`,
      );
    }

    return this.productAccountRepository.create({
      ...createProductAccountDto,
    });
  }

  async update(
    productAccountId: number,
    updateProductAccountDto: UpdateProductAccountDto,
    transaction?: Transaction,
  ) {
    const productAccount = (
      await this.findOne(productAccountId, transaction)
    ).toJSON();
    const updateData = { ...updateProductAccountDto };
    if (updateProductAccountDto.status === 'KOSONG') {
      // batch start end, product variant id set to null
      updateData.batch_start_date = null;
      updateData.batch_end_date = null;
      updateData.product_variant_id = null;
      // set status user = expired
      await this.productAccountUserRepository.update(
        { status: 'EXPIRED' },
        {
          where: { status: 'AKTIF', product_account_id: productAccount.id },
          transaction,
        },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.productAccountRepository.update(updateData as any, {
      where: { id: productAccount.id },
      transaction,
    });
  }

  async remove(productAccountId: number) {
    const productAccount = await this.findOne(productAccountId);
    await productAccount.destroy();
  }
}
