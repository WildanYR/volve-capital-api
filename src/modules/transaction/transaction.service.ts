import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from 'src/constant/database.const';
import { Transaction } from 'src/database/models/transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Order, WhereOptions } from 'sequelize';
import { PaginateOrderService } from '../paginate-order/paginate-order.service';
import { BaseGetAll } from 'src/validators/get-all-query.dto';
import { ITransactionFilter } from './types/transaction-filter.type';
import { ProductAccountUser } from 'src/database/models/product-account-user.model';
import { ProductVariant } from 'src/database/models/product-variant.model';
import { Product } from 'src/database/models/product.model';
import { ProductAccountUserService } from '../product-account-user/product-account-user.service';
import { Email } from 'src/database/models/email.model';
import { ProductAccount } from 'src/database/models/product-account.model';
import { Transaction as SequelizeTransaction } from 'sequelize';

@Injectable()
export class TransactionService {
  constructor(
    private readonly paginateOrderService: PaginateOrderService,
    private readonly productAccountUserService: ProductAccountUserService,
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: typeof Transaction,
  ) {}

  async findAll(paginateOrder?: BaseGetAll, filter?: ITransactionFilter) {
    const { limit, offset, order } =
      this.paginateOrderService.generatePaginate(paginateOrder);

    const whereOptions: WhereOptions = {};
    if (filter?.product_variant_id) {
      whereOptions.product_variant_id = filter.product_variant_id;
    }

    const transactions = await this.transactionRepository.findAndCountAll({
      where: whereOptions,
      order: order as Order,
      limit,
      offset,
      include: [
        {
          model: ProductVariant,
          as: 'product_variant',
          include: [{ model: Product, as: 'product' }],
        },
        {
          model: ProductAccountUser,
          as: 'product_account_user',
        },
        {
          model: ProductAccount,
          as: 'product_account',
          include: [{ model: Email, as: 'email' }],
        },
      ],
    });

    return this.paginateOrderService.paginateOrderResponse(
      transactions.rows,
      transactions.count,
      paginateOrder,
    );
  }

  async findOne(transactionId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
      include: [
        {
          model: ProductVariant,
          as: 'product_variant',
          include: [{ model: Product, as: 'product' }],
        },
        {
          model: ProductAccountUser,
          as: 'product_account_user',
        },
        {
          model: ProductAccount,
          as: 'product_account',
          include: [{ model: Email, as: 'email' }],
        },
      ],
    });

    if (!transaction)
      throw new NotFoundException(
        `transaction dengan id: ${transactionId} tidak ditemukan`,
      );

    return transaction;
  }

  async create(
    createTransactionDto: CreateTransactionDto,
    transaction?: SequelizeTransaction,
  ) {
    /**
     * 1. get usable akun
     * 2. update batch end dari usable akun
     * 3. buat akun user baru di usable akun
     * 4. buat transaksi
     */
    const productAccountUser = await this.productAccountUserService.create(
      {
        name: createTransactionDto.name,
        product_variant_id: createTransactionDto.product_variant_id,
      },
      transaction,
    );

    const productAccountUserObj = productAccountUser.toJSON();
    const status =
      createTransactionDto.status && createTransactionDto.status !== ''
        ? createTransactionDto.status
        : 'COMPLETED';
    return this.transactionRepository.create(
      {
        status,
        product_variant_id: createTransactionDto.product_variant_id,
        product_account_id: productAccountUserObj.product_account_id,
        product_account_user_id: productAccountUserObj.id,
      },
      { transaction },
    );
  }

  async update(
    transactionId: number,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.findOne(transactionId);

    return transaction.update({ ...updateTransactionDto });
  }

  async remove(transactionId: number) {
    const transaction = await this.findOne(transactionId);
    await transaction.destroy();
  }
}
