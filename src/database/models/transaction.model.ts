/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import {
  ProductVariant,
  ProductVariantAttributes,
} from './product-variant.model';
import {
  ProductAccount,
  ProductAccountAttributes,
} from './product-account.model';
import {
  ProductAccountUser,
  ProductAccountUserAttributes,
} from './product-account-user.model';
import { Optional } from 'sequelize';

export interface TransactionAttributes {
  id: number;
  status?: string;
  product_variant_id: number;
  product_account_id: number;
  product_account_user_id: number;
  product_variant: ProductVariantAttributes;
  product_account: ProductAccountAttributes;
  product_account_user: ProductAccountUserAttributes;
  created_at: Date;
  updated_at: Date;
}

interface TransactionCreationAttributes
  extends Optional<
    TransactionAttributes,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'product_variant'
    | 'product_account'
    | 'product_account_user'
  > {}

@Table({ tableName: 'transaction' })
export class Transaction extends Model<
  TransactionAttributes,
  TransactionCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @Column(DataType.STRING)
  status?: string;

  @ForeignKey(() => ProductVariant)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  product_variant_id: number;

  @ForeignKey(() => ProductAccount)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  product_account_id: number;

  @ForeignKey(() => ProductAccountUser)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  product_account_user_id: number;

  @BelongsTo(() => ProductVariant, 'product_variant_id')
  product_variant: ProductVariant;

  @BelongsTo(() => ProductAccount, 'product_account_id')
  product_account: ProductAccount;

  @BelongsTo(() => ProductAccountUser, 'product_account_user_id')
  product_account_user: ProductAccountUser;
}
