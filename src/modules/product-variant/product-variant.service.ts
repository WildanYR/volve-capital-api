import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRODUCT_VARIANT_REPOSITORY } from 'src/constant/database.const';
import { ProductVariant } from 'src/database/models/product-variant.model';
import { Order, Transaction, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { IProductVariantFilter } from './types/product-variant-filter.type';
import { Product } from 'src/database/models/product.model';

@Injectable()
export class ProductVariantService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly productVariantRepository: typeof ProductVariant,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: IProductVariantFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);

    const whereOptions: WhereOptions = {};
    if (filter?.name) {
      whereOptions.name = { [Op.like]: `%${filter.name}%` };
    }
    if (filter?.product_id) {
      whereOptions.product_id = filter.product_id;
    }

    const productVariant = await this.productVariantRepository.findAndCountAll({
      where: whereOptions,
      order: order as Order,
      limit,
      offset,
      include: [{ model: Product, as: 'product' }],
    });

    return this.paginateOrderService.paginateOrderResponse(
      productVariant.rows,
      productVariant.count,
      paginateOrder,
    );
  }

  async findOne(productVariantId: number, transaction?: Transaction) {
    const productVariant = await this.productVariantRepository.findOne({
      where: { id: productVariantId },
      include: [{ model: Product, as: 'product' }],
      transaction,
    });

    if (!productVariant)
      throw new NotFoundException(
        `productVariant dengan id: ${productVariantId} tidak ditemukan`,
      );

    return productVariant;
  }

  async create(createProductVariantDto: CreateProductVariantDto) {
    return this.productVariantRepository.create({ ...createProductVariantDto });
  }

  async update(
    productVariantId: number,
    updateProductVariantDto: UpdateProductVariantDto,
  ) {
    const productVariant = await this.findOne(productVariantId);

    return productVariant.update({ ...updateProductVariantDto });
  }

  async remove(productVariantId: number) {
    const productVariant = await this.findOne(productVariantId);
    await productVariant.destroy();
  }
}
