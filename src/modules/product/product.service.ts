import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/constant/database.const';
import { Product } from 'src/database/models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Order, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { IProductFilter } from './types/product-filter.type';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: IProductFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);
    const whereOptions: WhereOptions = {};
    if (filter?.name) {
      whereOptions.name = { [Op.like]: `%${filter.name}%` };
    }

    const products = await this.productRepository.findAndCountAll({
      where: whereOptions,
      order: order as Order,
      limit,
      offset,
    });

    return this.paginateOrderService.paginateOrderResponse(
      products.rows,
      products.count,
      paginateOrder,
    );
  }

  async findOne(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product)
      throw new NotFoundException(
        `product dengan id: ${productId} tidak ditemukan`,
      );

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    return this.productRepository.create({ ...createProductDto });
  }

  async update(productId: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(productId);

    return product.update({ ...updateProductDto });
  }

  async remove(productId: number) {
    const product = await this.findOne(productId);
    await product.destroy();
  }
}
