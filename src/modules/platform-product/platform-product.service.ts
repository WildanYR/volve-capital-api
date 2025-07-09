import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EWALLET_TYPE_REPOSITORY } from 'src/constant/database.const';
import { PlatformProduct } from 'src/database/models/platform-product.model';
import { CreatePlatformProductDto } from './dto/create-platform-product.dto';
import { UpdatePlatformProductDto } from './dto/update-platform-product.dto';
import { Order, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { IPlatformProductFilter } from './types/platform-product-filter.type';
import { Platform } from 'src/database/models/platform.model';
import { ProductVariant } from 'src/database/models/product-variant.model';
import { Product } from 'src/database/models/product.model';

@Injectable()
export class PlatformProductService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    @Inject(EWALLET_TYPE_REPOSITORY)
    private readonly platformProductRepository: typeof PlatformProduct,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: IPlatformProductFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);

    const whereOptions: WhereOptions = {};
    const productwhereOptions: WhereOptions = {};
    if (filter?.product_name) {
      whereOptions.product_name = { [Op.like]: `%${filter.product_name}%` };
    }
    if (filter?.product_id) {
      productwhereOptions.product_id = filter.product_id;
    }

    const platformProduct =
      await this.platformProductRepository.findAndCountAll({
        where: whereOptions,
        order: order as Order,
        limit,
        offset,
        include: [
          { model: Platform, as: 'platform', required: true },
          {
            model: ProductVariant,
            as: 'product_variant',
            where: productwhereOptions,
            required: true,
            include: [{ model: Product, as: 'product' }],
          },
        ],
      });

    return this.paginateOrderService.paginateOrderResponse(
      platformProduct.rows,
      platformProduct.count,
      paginateOrder,
    );
  }

  async findOne(platformProductId: number) {
    const platformProduct = await this.platformProductRepository.findOne({
      where: { id: platformProductId },
      include: [
        { model: Platform, as: 'platform' },
        {
          model: ProductVariant,
          as: 'product_variant',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    if (!platformProduct)
      throw new NotFoundException(
        `platformProduct dengan id: ${platformProductId} tidak ditemukan`,
      );

    return platformProduct;
  }

  async create(createPlatformProductDto: CreatePlatformProductDto) {
    return this.platformProductRepository.create({
      ...createPlatformProductDto,
    });
  }

  async update(
    platformProductId: number,
    updatePlatformProductDto: UpdatePlatformProductDto,
  ) {
    const platformProduct = await this.findOne(platformProductId);

    return platformProduct.update({ ...updatePlatformProductDto });
  }

  async remove(platformProductId: number) {
    const platformProduct = await this.findOne(platformProductId);
    await platformProduct.destroy();
  }
}
