/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import {
  ProductAccount,
  ProductAccountAttributes,
} from './product-account.model';
import { Transaction, TransactionAttributes } from './transaction.model';
import { Optional } from 'sequelize';
import {
  ProductVariant,
  ProductVariantAttributes,
} from './product-variant.model';

export interface ProductAccountUserAttributes {
  id: number;
  name: string;
  account_profile?: string;
  status?: string;
  product_account_id: number;
  product_variant_id: number;
  product_account: ProductAccountAttributes;
  product_variant: ProductVariantAttributes;
  transaction?: TransactionAttributes[];
  created_at: Date;
  updated_at: Date;
}

interface ProductAccountUserCreationAttributes
  extends Optional<
    ProductAccountUserAttributes,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'product_account'
    | 'transaction'
    | 'product_variant'
  > {}

@Table({ tableName: 'product_account_user' })
export class ProductAccountUser extends Model<
  ProductAccountUserAttributes,
  ProductAccountUserCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  account_profile?: string;

  @Column(DataType.STRING)
  status?: string;

  @ForeignKey(() => ProductAccount)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  product_account_id: number;

  @ForeignKey(() => ProductAccount)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  product_variant_id: number;

  @BelongsTo(() => ProductAccount, 'product_account_id')
  product_account: ProductAccount;

  @BelongsTo(() => ProductVariant, 'product_variant_id')
  product_variant: ProductVariant;

  @HasMany(() => Transaction)
  transaction?: Transaction[];
}
